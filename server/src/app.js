const express = require("express");
const app = express();
const cors = require("cors");
const createErrors = require("http-errors");
const morgan = require("morgan");
const xssClean = require("xss-clean");
//middleware
app.use(cors());
app.use(xssClean());
app.use(express.json());
app.use(morgan("dev"));
require("./config/passport");

//default
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

//API's
app.use("/api/user", require("./routes/user.route"));

//client error
app.use((req, res, next) => {
  next(createErrors(404, "Route not found."));
});

//handle serve errors
app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ success: false, message: err.message });
});

module.exports = app;
