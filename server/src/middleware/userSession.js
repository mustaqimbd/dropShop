const session = require("express-session");
const { sessionSecretKey } = require("../secret");

const userSession = () => {
  return session({
    secret: sessionSecretKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: "Lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });
};

module.exports = userSession;
