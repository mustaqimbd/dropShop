require("dotenv").config();

const config = {
  dev: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    token: process.env.ACCESS_TOKEN_SECRET,
  },
};

module.exports = config;
