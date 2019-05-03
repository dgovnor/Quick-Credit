import { loans } from '../models/dataStructure';

class UserController {
  static applyForLoan(req, res) {
    const {
      firstName, lastName, email, amount, tenor,
    } = req.body;
    const id = loans.length + 100;
    const status = 'Pending';
    const interest = 0.05 * amount;
    const paymentInstallment = (amount + interest) / tenor;
    const balance = amount;

    const data = {
      id,
      firstName,
      lastName,
      email,
      tenor,
      amount,
      paymentInstallment,
      status,
      balance,
      interest,
    };
    if (loans.find(user => user.email === email)) {
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
