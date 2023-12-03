const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const messages = result.array().map(item => item.msg);
    return res
      .status(400)
      .send({ success: false, message: "Validation error.", errors: messages });
  }
  next();
};
