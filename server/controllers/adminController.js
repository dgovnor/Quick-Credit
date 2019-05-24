import moment from 'moment';
import db from '../index';


class AdminController {
  static async adminVerifyUser(req, res) {
    const { email } = req.params;
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (rows.length === 0) {
        return res.status(400).json({
          status: 400,
          error: "This user doesn't exist",
        });
      }
      if (rows[0].status === 'verified') {
        return res.status(400).json({
          status: 400,
          error: 'User is already verified',
        });
      }
      await db.query('UPDATE users SET status = $1 WHERE email = $2', ['verified', email]);
      const newUserData = {
        email: rows[0].email,
        firstName: rows[0].firstname,
        lastName: rows[0].lastname,
        address: rows[0].address,
        status: 'verified',
        isAdmin: rows[0].isadmin,
      };
      return res.status(200).send({
        status: 200,
        data: newUserData,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: "This user doesn't exist",
      });
    }
  }

  static async adminPostRepayment(req, res) {
    const { loanid } = req.params;
    const { amount } = req.body;

    try {
      const loanId = await db.query('SELECT * FROM loans WHERE id = $1', [parseInt(loanid, 10)]);
      if (loanId.rows.length === 0) {
        return res.status(400).send({
          status: 400,
          error: 'Loan application not found',
        });
      }
      if (loanId.rows[0].status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'Loan should be approved to post payment',
        });
      }
      if (parseInt(amount, 10) <= loanId.rows[0].balance) {
        if (parseInt(amount, 10) % parseInt(loanId.rows[0].paymentinstallment, 10) !== 0) {
          return res.status(400).send({
            status: 400,
            error: `Amount can't be less than Monthly installment ${loanId.rows[0].paymentinstallment}`,
          });
        }
        const balance = parseInt(loanId.rows[0].balance, 10) - parseInt(amount, 10);
        await db.query('UPDATE loans SET balance = $1 WHERE id = $2', [balance, parseInt(loanid, 10)]);
        const loansRepayment = {
          loanId: loanId.rows[0].id,
          createdOn: moment().format('LLL'),
          amount: loanId.rows[0].amount,
          monthlyInstallment: loanId.rows[0].paymentinstallment,
          paidAmount: parseInt(amount, 10),
          balance,
        };
        const txt = `INSERT INTO repayment 
                    (loanid,createdon,amount) VALUES($1,$2,$3) RETURNING *`;
        const values = [loanId.rows[0].id, moment().format('LLL'), parseInt(amount, 10)];
        if (balance === 0) {
          await db.query('UPDATE loans SET repaid = $1 WHERE id = $2', [true, parseInt(loanid, 10)]);
        }
        await db.query(txt, values);
        return res.status(200).json({
          status: 200,
          message: 'Payment accepted',
          data: loansRepayment,
        });
      }
      if (loanId.rows[0].balance <= 0) {
        return res.status(201).json({
          status: 201,
          message: 'Client has repaid loan fully',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Amount exceeds client debt!',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Connection Error',
      });
    }
  }

  // Admin approves or rejects loan request
  static async approveOrRejectLoan(req, res) {
    const { loanid } = req.params;
    const { decision } = req.body;
    try {
      const loanId = await db.query('SELECT * FROM loans WHERE id = $1', [parseInt(loanid, 10)]);
      if (loanId.rows.length === 0) {
        return res.status(400).json({
          status: 400,
          error: 'This loan doesn\'t exist',
        });
      }
      const { rows } = await db.query('SELECT users.status FROM users JOIN loans ON users.email = loans.useremail WHERE loans.id = $1', [parseInt(loanid, 10)]);
      if (rows[0].status === 'verified') {
        if (loanId.rows[0].status === decision) {
          return res.status(400).json({
            status: 400,
            error: `Loan already ${decision}`,
          });
        }
        if (loanId.rows[0].balance <= 0) {
          return res.status(400).json({
            status: 400,
            error: 'Can\'t reject already paid Loan',
          });
        }
        await db.query('UPDATE loans SET status = $1 WHERE id = $2', [decision, parseInt(loanid, 10)]);
        const newLoanData = {
          loanId: loanId.rows[0].id,
          loanAmount: loanId.rows[0].amount,
          tenor: loanId.rows[0].tenor,
          status: decision,
          monthlyInstallment: loanId.rows[0].paymentInstallment,
          interest: loanId.rows[0].interest,
        };

        return res.status(200).json({
          status: 200,
          data: newLoanData,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'User is not yet verified',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Connection Error',
      });
    }
  }

  // Get loan of users
  static async getLoan(req, res) {
    const { status, repaid } = req.query;
    const queryKeys = Object.keys(req.query);
    if ((Object.keys(req.query).length) && (queryKeys[0] !== 'status' || queryKeys[1] !== 'repaid')) {
      return res.status(400).send({
        status: 400,
        error: 'Query must be status and repaid',
      });
    }
    const { rows } = await db.query('SELECT * FROM loans');
    if (status && repaid) {
      const checkLoans = rows.filter(loan => loan.status === status
        && loan.repaid.toString() === repaid);
      if (checkLoans && checkLoans.length) {
        return res.status(200).send({
          status: 200,
          data: checkLoans,
        });
      }
      if (checkLoans.length === 0) {
        return res.status(400).send({
          status: 400,
          error: 'No loan found',
        });
      }
    }
    if (rows.length < 1) {
      return res.status(400).send({
        status: 400,
        error: 'No loan found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: rows,
    });
  }

  // Get specific loan of users
  static async getSpecificLoan(req, res) {
    const { loanid } = req.params;
    const { rows } = await db.query('SELECT * FROM loans WHERE id = $1', [parseInt(loanid, 10)]);
    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Loan not found',
      });
    }

    const getloan = {
      id: rows[0].id,
      user: rows[0].useremail,
      createdOn: moment(rows[0].createdon).format('LLL'),
      status: rows[0].status,
      repaid: rows[0].repaid,
      tenor: rows[0].tenor,
      amount: rows[0].amount,
      paymentInstallment: rows[0].paymentinstallment,
      balance: rows[0].balance,
      interest: rows[0].interest,
    };

    return res.status(200).send({
      status: 200,
      data: getloan,
    });
  }

  static async getSpecificUser(req, res) {
    const { email } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'User not found',
      });
    }

    const newUser = {
      id: rows[0].id,
      email: rows[0].email,
      firstName: rows[0].firstname,
      lastName: rows[0].lastname,
      address: rows[0].address,
      status: rows[0].status,
      isAdmin: rows[0].isadmin,
    };
    return res.status(200).send({
      status: 200,
      data: newUser,
    });
  }
}


export default AdminController;
