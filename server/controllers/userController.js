import moment from 'moment';
import { loans, users, loanRepayment } from '../models/dataStructure';
import db from '../index';
import Authentic from '../auth/authentication';

class UserController {
  static async applyForLoan(req, res) {
    const {
      amount, tenor,
    } = req.body;
    const { verifyToken } = Authentic;
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = verifyToken(token);
    req.payload = decoded.payload;
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

      if (rows.length === 0 && rows[0].balance === 0) {
        await db.query(text, values);
        return res.status(201).send({
          status: 201,
          message: 'Successful',
          data,
        });
      }
      if (rows[0].balance > 0) {
        return res.status(409).send({
          status: 409,
          error: 'You have already applied for a loan',
        });
      }
    } catch (error) {
      console.log(error);
    }

    const loanresult2 = loans.findIndex(loan => loan.email === email && loan.balance > 0);
    const loanEmail = loans[loanresult2];
    const changeBalance = loans.find(loan => loan.email === email && loan.status === 'rejected' && loan.balance > 0);

    if (changeBalance) {
      loanEmail.balance = 0;
    }
    if (loans.find(loan => loan.email === email && loan.balance > 0)) {
      return res.status(409).send({
        status: 409,
        error: 'You have already applied for a loan',
      });
    }
  }

  static getRepaymentLoan(req, res) {
    const { id, loanid } = req.params;
    const userEmail = users.find(user => user.id === parseInt(id, 10));
    const loansId = loans.find(loan => loan.id === parseInt(loanid, 10));
    if (!loansId) {
      return res.status(400).send({
        status: 400,
        error: 'No loan repayment history',
      });
    }
    if (loansId.email === userEmail.email) {
      const repayment = loanRepayment.filter(loani => loani.loadId === parseInt(loanid, 10));
      if (repayment.length > 0) {
        return res.status(200).send({
          status: 200,
          data: repayment,
        });
      }
      return res.status(400).send({
        status: 400,
        error: 'No loan repayment history',
      });
    }

    return res.status(403).send({
      status: 403,
      error: 'Unauthorized User',
    });
  }
}

export default UserController;
