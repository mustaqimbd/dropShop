require("dotenv").config();

const userRegisterSecret = process.env.REGISTER_USER_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const forgotPasswordTokenSecret = process.env.FORGOT_PASSWORD_SECRET;
const PORT = process.env.PORT || 3000;
const dBURL = process.env.MONGODB_URL;
const SMTPUserName = process.env.SMTP_USERNAME;
const SMTPPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_URL;
const env = process.env.NODE_ENV;
const sessionSecretKey = process.env.SESSION_SECRET;
//ssl sercret
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;

module.exports = {
  userRegisterSecret,
  accessTokenSecret,
  forgotPasswordTokenSecret,
  env,
  PORT,
  dBURL,
  SMTPUserName,
  SMTPPassword,
  clientUrl,
  sessionSecretKey,
  store_id,
  store_passwd,
};
