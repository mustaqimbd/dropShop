require("dotenv").config();

const userRegisterSecret = process.env.REGISTER_USER_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const PORT = process.env.PORT || 3000;
const dBURL = process.env.MONGODB_URL;
const SMTPUserName = process.env.SMTP_USERNAME;
const SMTPPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_URL;

module.exports = {
  userRegisterSecret,
  PORT,
  dBURL,
  accessTokenSecret,
  SMTPUserName,
  SMTPPassword,
  clientUrl,
};
