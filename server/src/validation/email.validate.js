const { check } = require("express-validator");

const validateEmail = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];
module.exports = validateEmail;
