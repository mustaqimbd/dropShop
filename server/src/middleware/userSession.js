const session = require("express-session");
const { sessionSecretKey, env } = require("../secret");

const userSession = () => {
  return session({
    secret: sessionSecretKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: env === "production" ? "None" : "Lax",
      httpOnly: true,
      secure: env === "production", // true only in production,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });
};

module.exports = userSession;
