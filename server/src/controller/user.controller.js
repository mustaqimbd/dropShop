const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { successResponse, errorResponse } = require("./responseHandler");
const userInfoHandler = require("./userinfoHandler");

//register a new user
const registerNewUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      logo,
      mobile,
      address,
      district,
      webOrPageLink,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) return errorResponse(res, 400, "This email is already taken.");
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
      logo,
      mobile,
      address,
      district,
      webOrPageLink,
    });
    await newUser.save();
    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully.",
    });
  } catch (error) {
    return next(error);
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
        const token = jwt.sign(payLoad, config.jwt.token, {
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
  registerNewUser,
  loginUser,
  userProfile,
  logOutUser,
  changePassword,
};
