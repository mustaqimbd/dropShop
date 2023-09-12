const { errorResponse } = require("../controller/responseHandler");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return errorResponse(
      res,
      403,
      "Access denied only admins can add product."
    );
  }
  next();
};

module.exports = isAdmin;
