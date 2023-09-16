const { clientUrl } = require("../secret");

const forgotPasswordEmailData = (email, token) => {
  const emailInfo = {
    email,
    subject: "Reset your Super shop password.",
    html: `
  <div style="text-align:center; font-family: sans-serif;">
    <h2 style="font-size:30px">Lost password?</h2>
    <p>Follow the instruction to reset your password</p>
    <p>Click the button to reset your password.This link will expires in 10 min.</p>
    <a href="${clientUrl}/accounts/verify/${token}" style="text-decoration: none;"><button
            style="border: none;padding: 10px;background-color: #83B735;border-radius: 3px;color: #fff;font-weight: bold; cursor: pointer;">
            Reset password
        </button></a>
</div>
  `,
  };
  return emailInfo;
};

module.exports = forgotPasswordEmailData;
