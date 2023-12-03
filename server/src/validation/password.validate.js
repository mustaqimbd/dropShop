const { check } = require("express-validator");

const validatePassword = [
  check("password" || "newPassword")
    .notEmpty()
    .withMessage("Please provide a password.")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one special character (@, #, $, %, *, ?), and one number."
    ),
];
module.exports = validatePassword;
