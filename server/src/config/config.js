require("dotenv").config();

const config = {
  dev: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
};

module.exports = config;
