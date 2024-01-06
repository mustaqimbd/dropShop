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
const { clientUrl } = require("./secret");
const userSession = require("./middleware/userSession");

//cors config
const corsOptions = {
  origin: clientUrl,
  credentials: true, // This is important for cookies to work
};

//middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
require("./config/passport");
app.use(userSession());

//default
app.get("/", (req, res) => {
  return successResponse(res, { message: "Server is running successfully." });
});

//API's
app.use("/api/user", require("./routes/user.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/reseller", require("./routes/reseller.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/products", require("./routes/products.route"));
app.use("/api/order", require("./routes/order.route"));
app.use("/api/cart", require("./routes/cart.route"));

//seed api's
app.use("/api/seed", require("./routes/seed.route"));
app.use("/api/payments", require("./routes/payments.route"));

//client error
app.use((req, res, next) => {
  next(createErrors(404, "Route not found."));
});

//handle server errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  return errorResponse(res, err.status, err.message);
});

module.exports = app;
