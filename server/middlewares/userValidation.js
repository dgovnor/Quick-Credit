class userValidation {
  static signupValidation(req, res, next) {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .isEmail()
      .withMessage("Invalid Email address")
      .customSanitizer(email => email.toLowerCase());

    req
      .checkBody("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage("Name should be between 3 to 15 character long")
      .isAlpha()
      .withMessage("Name should only contain alphabets");

    req
      .checkBody("lastName")
      .notEmpty()
      .withMessage("last name is required")
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage("Name should be between 3 to 15 character long")
      .isAlpha()
      .withMessage("Name should only contain alphabets");

    req
      .checkBody("password")
      .notEmpty()
      .withMessage("Password is required")
      .trim()
      .isLength({ min: 8, max: 15 })
      .withMessage("Password should be between 8 to 15 character long");

    req
      .checkBody("address")
      .notEmpty()
      .withMessage("Address is required")
      .trim()
      .isLength({ min: 10, max: 100 })
      .withMessage("Name should be between 10 to 100 character long")
      .matches(/^[A-Za-z0-9\.\-\s\,]*$/)
      .withMessage("Invalid Address entered");
    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error[0].msg
      });
    }
    //TODO check why no return to this next
    next();
  }
}
export default userValidation;
