const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createErrors = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const {
  errorResponse,
  successResponse,
} = require("./controller/responseHandler");

//middleware
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
require("./config/passport");

//default
app.get("/", (req, res) => {
  return successResponse(res, { message: "Server is running successfully." });
});

//API's
app.use("/api/user", require("./routes/user.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/products", require("./routes/products.route"));
//client error
app.use((req, res, next) => {
  next(createErrors(404, "Route not found."));
});

//handle serve errors
app.use((err, req, res, next) => {
  return errorResponse(res, err.status, err.message);
});

module.exports = app;
