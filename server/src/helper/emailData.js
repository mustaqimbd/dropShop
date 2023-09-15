const { clientUrl } = require("../secret");

const emailData = (email, name, token) => {
  const emailInfo = {
    email,
    subject:
      "Verify Your Email Address to Activate Your Super Drop Shop Account",
    html: `
  <div style="text-align:center; font-family: sans-serif;">
    <h2 style="font-size:30px">Welcome!</h2>
    <div style="margin-top:30px;">
        <img src="https://i.ibb.co/5khGGt2/agreement.png" style="width:60px" />
    </div>
    <p>Hi ${name}.Please verify you email address.This link will expires in 10 min.</p>
    <a href="${clientUrl}/accounts/verify/${token}" style="text-decoration: none;"><button
            style="border: none;padding-inline: 20px;padding-block: 10px;background-color: #83B735;border-radius: 3px;color: #fff;font-weight: bold; cursor: pointer;">
            Verify Email
        </button></a>
</div>
  `,
  };
  return emailInfo;
};
module.exports = emailData;
