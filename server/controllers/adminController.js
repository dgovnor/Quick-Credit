import { userdata } from '../models/testdata';
import { loanRepayment, loans } from '../models/dataStructure';

class AdminController {
  static adminVerifyUser(req, res) {
    const { email } = req.params;
    const userData = userdata.find(user => user.email === email);

    if (userData) {
      userData.status = 'verified';

      const newUserData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        address: userData.address,
        status: userData.status,
        isAdmin: userData.isAdmin,
      };

      return res.status(200).send({
        status: 200,
        data: newUserData,
      });
    }
    return res.status(400).send({
      status: 400,
      error: "This user doesn't exist",
    });
  }

  static AdminPostRepayment(req, res) {
    const { loanid } = req.params;
    const { amount } = req.body;
    const loanresult = loans.find(loan => loan.id === parseInt(loanid, 10));
    if (loanresult) {
      const repayment = {
        id: loanRepayment.length + 100,
        createdOn: new Date(),
        loadId: loanresult.id,
        amount,
      };
      loanRepayment.push(repayment);

      const loanresult2 = loans.findIndex(loan => loan.id === parseInt(loanid, 10));
      if (parseInt(amount, 10) <= loans[loanresult2].balance) {
        loans[loanresult2].balance -= parseInt(amount, 10);

        const loansRepayment = {
          id: loanRepayment.length + 100,
          loanId: loanresult.id,
          createdOn: new Date(),
          amount: loanresult.amount,
          monthlyInstallment: loanresult.paymentInstallment,
          paidAmount: parseInt(repayment.amount, 10),
          balance: loans[loanresult2].balance,
        };
        if (loansRepayment.balance === 0) {
          loans[loanresult2].repaid = true;
        }

        return res.status(200).send({
          status: 200,
          message: 'Payment accepted',
          data: loansRepayment,
        });
      }
      if (loans[loanresult2].balance === 0) {
        return res.status(201).send({
          status: 201,
          message: 'Client has repaid loan fully',
        });
      }
      return res.status(400).send({
        status: 400,
        error: 'Amount exceeds client debt!',
      });
    }

    return res.status(400).send({
      status: 400,
      error: 'Loan application not found',
    });
  }
}

export default AdminController;
