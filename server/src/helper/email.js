const nodemailer = require("nodemailer");
const { SMTPUserName, SMTPPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTPUserName,
    pass: SMTPPassword,
  },
});
const emailWithNodeMailer = async emailData => {
  try {
    const mailsOptions = {
      from: SMTPUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    await transporter.sendMail(mailsOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = emailWithNodeMailer;
