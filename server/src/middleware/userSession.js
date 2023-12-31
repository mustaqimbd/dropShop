const session = require("express-session");
const { sessionSecretKey } = require("../secret");

const userSession = () => {
  return session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "Lax", // or "Strict"
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      // maxAge: 60 * 1000, // 1 minute in milliseconds
    },
  });
};

module.exports = userSession;
