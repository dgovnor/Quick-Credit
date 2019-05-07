import { loans, users } from '../models/dataStructure';
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
      createdOn: new Date(),
      amount,
      paymentInstallment: (parseInt(amount, 10) + interest) / parseInt(tenor, 10),
      status: 'Pending',
      repaid: false,
      balance: parseInt(amount, 10) + interest,
      interest,
    };
    if (loans.find(loan => loan.email === email)) {
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
}

export default UserController;
