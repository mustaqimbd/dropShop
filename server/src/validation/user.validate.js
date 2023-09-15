const { check } = require("express-validator");

const userValidate = [
  check("name").trim().notEmpty().withMessage("Please Provide name."),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't empty.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .notEmpty()
    .withMessage("Please provide a password.")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one special character (@, #, $, %, *, ?), and one number."
    ),
  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Please provide a mobile number."),
  check("address").trim().notEmpty().withMessage("Please provide a address."),
  check("role").isEmpty(),
];

module.exports = { userValidate };
