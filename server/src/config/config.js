require("dotenv").config();

const config = {
  dev: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    token: process.env.TOKEN_SECRET,
  },
};

module.exports = config;
