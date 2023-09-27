const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateUniqueId = require("generate-unique-id");
const {
  accessTokenSecret,
  userRegisterSecret,
  forgotPasswordTokenSecret,
  clientUrl,
} = require("../secret");
const { successResponse, errorResponse } = require("./responseHandler");
const userInfoHandler = require("./userinfoHandler");
const registerRequestEmailData = require("../helper/registerRequestEmailData");
const emailWithNodeMailer = require("../helper/email");
const createErrors = require("http-errors");
const forgotPasswordEmailData = require("../helper/forgotPasswordEmailData");

//process register
const requestRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return errorResponse(res, 409, "Email is already registered.");
    const payload = {
      name,
      email,
      password,
    };
    const token = jwt.sign(payload, userRegisterSecret, { expiresIn: "10m" });
    const emailInfo = registerRequestEmailData(email, name, token);
    try {
      await emailWithNodeMailer(emailInfo);
    } catch (error) {
      return next(createErrors(500, "Failed to send email."));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Email sended successfully.",
      payload: { email },
    });
  } catch (error) {
    next(error);
  }
};

//register a new user
const registerNewUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createErrors(404, "Token not found.");
    const decoded = jwt.verify(token, userRegisterSecret);
    const user = await User.findOne({ email: decoded.email });
    if (user) throw createErrors(400, "Email already registered.");
    const hash = await bcrypt.hash(decoded.password, 10);
    const user_id = generateUniqueId({ length: 15 });
    console.log(user_id);
    await User.create({
      full_name: decoded.name,
      email: decoded.email,
      password: hash,
      user_id,
    });
    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully.",
    });
  } catch (error) {
    if ((error.message = "jwt expired")) {
      return next(
        createErrors(
          400,
          "Your email verification session is expired. Please try agin to register."
        )
      );
    }
    next(error);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 400, "User is not registered.");

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return errorResponse(res, 500, err.message);
      if (result) {
        const payLoad = {
          id: user._id,
          email: user.email,
        };
        const token = jwt.sign(payLoad, accessTokenSecret, {
          expiresIn: "2d",
        });
        res.cookie("token", token, {
          domain: clientUrl,
          path: "/",
          httpOnly: true,
          sameSite: "None",
          secure: true,
          expiresIn: new Date(Date.now() + 2 * 60 * 24),
        });
        const userInfo = userInfoHandler(user);

        return successResponse(res, {
          statusCode: 200,
          message: "Logged in successfully.",
          payload: { userInfo, token: `Bearer ${token}` },
        });
      } else {
        return errorResponse(res, 401, "Password did not match.");
      }
    });
  } catch (error) {
    next(error);
  }
};

//get user profile
const userProfile = (req, res, next) => {
  try {
    const userInfo = userInfoHandler(req.user);
    return successResponse(res, {
      statusCode: 200,
      message: "User info",
      payload: { userInfo },
    });
  } catch (error) {
    next(error);
  }
};

//forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "No user exist with this email.");
    const payload = { email, _id: user._id };
    const token = jwt.sign(payload, forgotPasswordTokenSecret, {
      expiresIn: "10m",
    });
    const forgotPasswordEmail = forgotPasswordEmailData(email, token);
    try {
      await emailWithNodeMailer(forgotPasswordEmail);
    } catch (error) {
      return next(createErrors(500, "Failed to send email."));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Email sended successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//reset password
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token) return errorResponse(res, 403, "No token found");
    const decoded = jwt.verify(token, forgotPasswordTokenSecret);
    const hash = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { _id: decoded._id },
      { $set: { password: hash } }
    );
    return successResponse(res, {
      statusCode: 200,
      message: "Password reset successful.",
    });
  } catch (error) {
    if (error.message === "jwt expired") {
      return next(
        createErrors(
          400,
          "Your password reset session is expired. Please send a forgot password request again."
        )
      );
    }
    next(error);
  }
};

//logout user
const logOutUser = (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message: "Logged out user successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//change password
const changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { previousPassword, newPassword } = req.body;
    bcrypt.compare(previousPassword, user.password, async (err, result) => {
      if (err) return errorResponse(res, 500, err.message);
      if (result) {
        const hash = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: user._id }, { $set: { password: hash } });
        return successResponse(res, {
          statusCode: 200,
          message: "Password changed successfully.",
        });
      } else {
        return errorResponse(res, 400, "Password did not match.");
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestRegister,
  registerNewUser,
  loginUser,
  userProfile,
  logOutUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
