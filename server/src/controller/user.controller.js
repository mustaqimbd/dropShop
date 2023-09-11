const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { successResponse, errorResponse } = require("./responseHandler");
const userInfoHandler = require("./userinfoHandler");
const createErrors = require("http-errors");

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
    if (user)
      return res
        .status(401)
        .json({ success: false, message: "User is already registered." });
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
    return successResponse(res, 201, "User created successfully.");
  } catch (error) {
    return next(error);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User is not registered." });

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
        return successResponse(res, 200, "Logged in successfully.", {
          user: userInfo,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Password did not match." });
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
    return successResponse(res, 200, "User Info", { user: userInfo });
  } catch (error) {
    next(error);
  }
};

//logout user
const logOutUser = (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, 200, "Logged out user successfully.");
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
        return successResponse(res, 200, "Password changed successfully.");
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
