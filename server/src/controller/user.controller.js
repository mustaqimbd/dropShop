const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { accessTokenSecret, userRegisterSecret } = require("../secret");
const { successResponse, errorResponse } = require("./responseHandler");
const userInfoHandler = require("./userinfoHandler");
const emailData = require("../helper/emailData");
const emailWithNodeMailer = require("../helper/email");
const createErrors = require("http-errors");

//process register
const requestRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      address,
      logo,
      district,
      webOrPageLink,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) return errorResponse(res, 409, "Email is already registered.");
    const payload = {
      name,
      email,
      password,
      mobile,
      address,
      logo,
      district,
      webOrPageLink,
    };
    const token = jwt.sign(payload, userRegisterSecret, { expiresIn: "10m" });
    const emailInfo = emailData(email, name, token);
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
    await User.create({
      name: decoded.name,
      email: decoded.email,
      password: hash,
      logo: decoded.logo,
      mobile: decoded.mobile,
      address: decoded.address,
      district: decoded.district,
      webOrPageLink: decoded.webOrPageLink,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully.",
    });
  } catch (error) {
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
        res.cookie("token", token, { httpOnly: true });
        const userInfo = userInfoHandler(user);
        return successResponse(res, {
          statusCode: 200,
          message: "Logged in successfully.",
          payload: { userInfo },
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
};
