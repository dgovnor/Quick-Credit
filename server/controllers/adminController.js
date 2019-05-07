import { users, loanRepayment, loans } from '../models/dataStructure';


class AdminController {
  static adminVerifyUser(req, res) {
    const { email } = req.params;
    const userDataIndex = users.findIndex(user => user.email === email);
    const userData = users[userDataIndex];
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

  // Admin approves or rejects loan request
  static approveOrRejectLoan(req, res) {
    const { loanid } = req.params;
    const { decision } = req.body;
    const loanresult2 = loans.findIndex(loan => loan.id === parseInt(loanid, 10));
    const loanresult = loans[loanresult2];
    if (loanresult) {
      const userresult = users.find(user => user.email === loanresult.email);
      if (userresult.status === 'verified') {
        if (loanresult) {
          loanresult.status = decision;

          const newLoanData = {
            loanId: loanresult.id,
            loanAmount: loanresult.amount,
            tenor: loanresult.tenor,
            status: loanresult.status,
            monthlyInstallment: loanresult.paymentInstallment,
            interest: loanresult.interest,
          };

          return res.status(200).send({
            status: 200,
            data: newLoanData,
          });
        }
      }
      return res.status(400).send({
        status: 400,
        error: 'User is not yet verified',
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'This loan doesn\'t exist',
    });
  }

  // Get loan of users
  static getLoan(req, res) {
    const { status, repaid } = req.query;
    const queryKeys = Object.keys(req.query);
    if ((Object.keys(req.query).length) && (queryKeys[0] !== 'status' || queryKeys[1] !== 'repaid')) {
      return res.status(400).send({
        status: 400,
        error: 'Query must be status and repaid',
      });
    }
    if (status && repaid) {
      const checkLoans = loans.filter(loan => loan.status === status
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
    if (loans.length < 1) {
      return res.status(404).send({
        status: 404,
        error: 'No loan found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: loans,
    });
  }

  // Get specific loan of users
  static getSpecificLoan(req, res) {
    const { loanid } = req.params;
    const loanresult = loans.find(loan => loan.id === parseInt(loanid, 10));
    if (loanresult) {
      const getloan = {
        id: loanresult.id,
        user: loanresult.email,
        createdOn: new Date(),
        status: loanresult.status,
        repaid: loanresult.repaid,
        tenor: loanresult.tenor,
        amount: loanresult.amount,
        paymentInstallment: loanresult.paymentInstallment,
        balance: loanresult.balance,
        interest: loanresult.interest,
      };

      return res.status(200).send({
        status: 200,
        data: getloan,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Loan not found',
    });
  }
}


export default AdminController;
