const { check } = require("express-validator");

const userValidate = [
  check("name").trim().notEmpty().withMessage("Please Provide name."),

  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Please provide a mobile number."),
  check("address").trim().notEmpty().withMessage("Please provide a address."),
  check("role").isEmpty(),
];

module.exports = { userValidate };
