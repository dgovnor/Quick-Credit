
class AdminValidation {
  static repaymentLoanValidation(req, res, next) {
    req
      .checkBody('amount')
      .notEmpty()
      .withMessage('Amount is required')
      .trim()
      .isNumeric()
      .withMessage('Amount should be a number')
      .isInt({ min: 0 })
      .withMessage('Amount should be more than 0');
    req
      .checkParams('loanid')
      .notEmpty()
      .withMessage('loan application not found')
      .isNumeric()
      .withMessage('loan application not found');
    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg,
      });
    }
    return next();
  }

  static approveOrRejectValidation(req, res, next) {
    req
      .checkBody('decision')
      .notEmpty()
      .withMessage('Approved or rejected')
      .customSanitizer(decision => decision.toLowerCase())
      .isIn(['approved', 'rejected'])
      .withMessage('Either approved or rejected');

    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg,
      });
    }
    return next();
  }

  static getSpecificLoanValidation(req, res, next) {
    req
      .checkParams('loanid')
      .notEmpty()
      .withMessage('Loan not found')
      .isNumeric()
      .withMessage('Loan not found');
    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg,
      });
    }
    return next();
  }

  static getSpecificUserValidation(req, res, next) {
    req
      .checkParams('email')
      .isEmail()
      .withMessage('invalid email')
      .customSanitizer(email => email.toLowerCase());
    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg,
      });
    }
    return next();
  }

  static getLoanValidation(req, res, next) {
    req
      .checkQuery('status')
      .isIn('approved')
      .withMessage('Bad request')
      .optional();

    req
      .checkQuery('repaid')
      .isBoolean()
      .withMessage('Bad request')
      .optional();

    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg,
      });
    }
    return next();
  }
}
export default AdminValidation;
