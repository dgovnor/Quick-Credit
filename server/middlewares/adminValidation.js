
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
      return res.status(404).json({
        status: 404,
        error: error[0].msg,
      });
    }
    return next();
  }

  static getSpecificLoanValidation(req, res, next) {
    req
      .isNumeric()
      .withMessage('Loan not found');
    const error = req.validationErrors();
    if (error) {
      return res.status(404).json({
        status: 404,
        error: error[0].msg,
      });
    }
    return next();
  }
}
export default AdminValidation;
