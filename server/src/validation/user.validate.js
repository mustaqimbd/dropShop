const { check } = require("express-validator");

const userValidate = [
  check("name").trim().notEmpty().withMessage("Please Provide name."),
  check("role").isEmpty(),
];

module.exports = { userValidate };
