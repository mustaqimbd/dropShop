const rateLimit = require("express-rate-limit");

const limitRequest = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 5,
  message: { success: false, message: "Too many request." },
});

module.exports = limitRequest;
