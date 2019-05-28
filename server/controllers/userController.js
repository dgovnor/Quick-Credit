import moment from 'moment';
import db from '../index';


class UserController {
  static async applyForLoan(req, res) {
    const {
      amount, tenor,
    } = req.body;
    const { email } = req.payload;
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    const interest = 0.05 * parseInt(amount, 10);
    const text = `INSERT INTO 
    loans(useremail,
      tenor,createdOn,amount,paymentInstallment,status,repaid,balance,interest) VALUES($1,$2,$3,
        $4,$5,$6,$7,$8,$9) RETURNING *`;
    const values = [
      user.rows[0].email,
      tenor,
      moment().format('LLL'),
      amount,
      (parseInt(amount, 10) + interest) / parseInt(tenor, 10),
      'Pending',
      false,
      parseInt(amount, 10) + interest,
      interest,
    ];


    try {
      const { rows } = await db.query('SELECT * FROM loans WHERE useremail = $1', [email]);

      if (rows.length === 0) {
        const result = await db.query(text, values);
        const data = {
          id: result.rows[0].id,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          email: user.rows[0].email,
          tenor: result.rows[0].tenor,
          createdOn: moment(result.rows[0].createdon).format('LLL'),
          amount: result.rows[0].amount,
          paymentInstallment: result.rows[0].paymentinstallment,
          status: result.rows[0].status,
          repaid: result.rows[0].repaid,
          balance: result.rows[0].balance,
          interest: result.rows[0].interest,
        };
        return res.status(201).send({
          status: 201,
          message: 'Successful',
          data,
        });
      }
      const recentLoan = rows.find(loan => loan.balance > 0 && loan.status === 'rejected');
      if (recentLoan) {
        await db.query('UPDATE loans SET balance =$1 WHERE id = $2', ['0', recentLoan.id]);
      }
      const result = await db.query('SELECT * FROM loans WHERE useremail = $1', [email]);
      const resultLoan = result.rows.find(loan => loan.balance > 0);

      if (!resultLoan) {
        const newLoan = await db.query(text, values);
        const data = {
          id: newLoan.rows[0].id,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          email: user.rows[0].email,
          tenor: newLoan.rows[0].tenor,
          createdOn: moment(newLoan.rows[0].createdon).format('LLL'),
          amount: newLoan.rows[0].amount,
          paymentInstallment: newLoan.rows[0].paymentinstallment,
          status: newLoan.rows[0].status,
          repaid: newLoan.rows[0].repaid,
          balance: newLoan.rows[0].balance,
          interest: newLoan.rows[0].interest,
        };
        return res.status(201).send({
          status: 201,
          message: 'Successful',
          data,
        });
      }
      if (resultLoan) {
        return res.status(409).send({
          status: 409,
          error: 'You have already applied for a loan',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getRepaymentLoan(req, res) {
    const { loanid } = req.params;
    const { email } = req.payload;

    const { rows } = await db.query(`SELECT repayment.loanid,loans.createdon,loans.paymentinstallment,repayment.amount FROM loans 
                                    JOIN repayment ON loans.id = repayment.loanid WHERE loans.useremail = $1`, [email]);
    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'No repayment history found',
      });
    }
    const loansId = rows.filter(loan => loan.loanid === parseInt(loanid, 10));
    if (loansId.length < 1) {
      return res.status(400).send({
        status: 400,
        error: 'No loan repayment history',
      });
    }
    return res.status(200).send({
      status: 200,
      data: loansId,
    });
  }
}

export default UserController;
