const rateLimit = require("express-rate-limit");

const limitRequest = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 5,
  message: { success: false, message: "Too many request from this ip." },
});

module.exports = limitRequest;
