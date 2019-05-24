import moment from 'moment';
import db from '../index';


class UserController {
  static async applyForLoan(req, res) {
    const {
      amount, tenor,
    } = req.body;
    const { email } = req.payload;
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    const interest = 0.05 * parseInt(amount, 10);
    const text = `INSERT INTO 
    loans(useremail,
      tenor,createdOn,amount,paymentInstallment,status,repaid,balance,interest) VALUES($1,$2,$3,
        $4,$5,$6,$7,$8,$9) RETURNING *`;
    const values = [
      rows[0].email,
      tenor,
      moment().format('LLL'),
      amount,
      (parseInt(amount, 10) + interest) / parseInt(tenor, 10),
      'Pending',
      false,
      parseInt(amount, 10) + interest,
      interest,
    ];
    const data = {
      firstName: rows[0].firstname,
      lastName: rows[0].lastname,
      email: rows[0].email,
      tenor,
      createdOn: moment().format('LLL'),
      amount,
      paymentInstallment: (parseInt(amount, 10) + interest) / parseInt(tenor, 10),
      status: 'Pending',
      repaid: false,
      balance: parseInt(amount, 10) + interest,
      interest,
    };

    try {
      const { rows } = await db.query('SELECT * FROM loans WHERE useremail = $1', [email]);

      if (rows.length === 0) {
        await db.query(text, values);
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
        await db.query(text, values);
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
