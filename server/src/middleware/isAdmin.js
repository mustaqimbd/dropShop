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

module.exports = isAdmin;
//Hello Middleware
//Hello Middleware Abdullah
