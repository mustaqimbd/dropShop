const { check, validationResult } = require("express-validator");

const userValidate = [
  check("name").trim().notEmpty().withMessage("Please Provide name."),
  check("role").isEmpty(),
];

const validateEmail = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];
const validatePassword = [
  check("password")
    .notEmpty()
    .withMessage("Please provide a password.")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one special character (@, #, $, %, *, ?), and one number."
    ),
];
const validateMobile = [
  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Please provide a mobile")
    .matches(/^[0-9\+]+$/)
    .withMessage("Please provide a valid mobile")
    .isLength({ max: 15 })
    .withMessage("Please provide a valid mobile"),
];

const runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const messages = result.array().map((item) => item.msg);
    return res
      .status(400)
      .send({ success: false, message: "Validation error.", errors: messages });
  }
  next();
};

module.exports = {
  userValidate,
  validateEmail,
  validatePassword,
  validateMobile,
  runValidation,
};
