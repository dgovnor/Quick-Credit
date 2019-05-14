import moment from 'moment';
import { loans, users, loanRepayment } from '../models/dataStructure';
import Authentic from '../auth/authentication';

class UserController {
  static applyForLoan(req, res) {
    const {
      amount, tenor,
    } = req.body;
    const { verifyToken } = Authentic;
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = verifyToken(token);
    req.payload = decoded.payload;
    const { email } = req.payload;
    const user = users.find(use => use.email === email);
    const interest = 0.05 * parseInt(amount, 10);
    const data = {
      id: loans.length + 100,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tenor,
      createdOn: moment().format('LLL'),
      amount,
      paymentInstallment: (parseInt(amount, 10) + interest) / parseInt(tenor, 10),
      status: 'Pending',
      repaid: false,
      balance: parseInt(amount, 10) + interest,
      interest,
    };
    if (loans.find(loan => loan.email === email && loan.balance > 0)) {
      return res.status(409).send({
        status: 409,
        error: 'You have already applied for a loan',
      });
    }
    loans.push(data);
    return res.status(201).send({
      status: 201,
      message: 'Successful',
      data,
    });
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
