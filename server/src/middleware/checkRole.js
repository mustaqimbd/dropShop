const { errorResponse } = require("../controller/responseHandler");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return errorResponse(
      res,
      403,
      "Access denied. This data can only access the admins."
    );
  }
  next();
};

const isReseller = (req, res, next) => {
  if (req.user.role !== "reseller") {
    return errorResponse(
      res,
      403,
      "Access denied. This data can only access the resellers."
    );
  }
  next();
};

module.exports = { isAdmin, isReseller };
//Hello Middleware
//Hello Middleware Abdullah
