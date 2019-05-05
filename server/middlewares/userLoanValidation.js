
class LoanValidation {
  static userLoanValidation(req, res, next) {
    req
      .checkBody('amount')
      .notEmpty()
      .withMessage('Amount is required')
      .trim()
      .isNumeric()
      .withMessage('Amount should be a number')
      .isFloat({ gt: 4999 })
      .withMessage('Minimum amount is 5000');
    req
      .checkBody('tenor')
      .notEmpty()
      .withMessage('Tenor is required')
      .trim()
      .isNumeric()
      .withMessage('Tenor should be a number')
      .isInt({ min: 1, max: 12 })
      .withMessage('Tenor can\'t be more than 12month or less than 1month');
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
export default LoanValidation;
