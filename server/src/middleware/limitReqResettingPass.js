const rateLimit = require("express-rate-limit");

const limitReqResettingPass = rateLimit({
  windowMs: 10 * 60 * 1000, //1 minute
  max: 1,
  message: { success: false, message: "You can send request only once." },
});

module.exports = limitReqResettingPass;
