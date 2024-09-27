const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  accessTokenSecret,
  userRegisterSecret,
  forgotPasswordTokenSecret,
} = require("../secret");
const { successResponse, errorResponse } = require("./responseHandler");
const userInfoHandler = require("./userinfoHandler");
const registerRequestEmailData = require("../helper/registerRequestEmailData");
const emailWithNodeMailer = require("../helper/email");
const createErrors = require("http-errors");
const forgotPasswordEmailData = require("../helper/forgotPasswordEmailData");
const uniqueID = require("../helper/uniqueID");

//process register
const requestRegister = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    const user = await User.findOne({ email });
    if (user) return errorResponse(res, 409, "Email is already registered.");
    const payload = {
      name,
      email,
      password,
      mobile,
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
    const user_id = uniqueID("UID");
    await User.create({
      name: decoded.name,
      email: decoded.email,
      mobile: decoded.mobile,
      password: hash,
      user_id,
    });
    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully.",
    });
  } catch (error) {
    if ((error.message == "jwt expired")) {
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

//update user
const updateUserProfile = async (req, res, next) => {
  try {
    const updatedData = req.body; // Get updated user data from request body
    const {
      _id,
      name,
      email,
      mobile,
      shop_info,
      payments,
      withdraw,
      settings,
    } = req.user;
    const { shop_name, logo, address, pageOr_webLink, description } = shop_info;
    const { account_no, payment_method, subscription } = payments;

    if (!req.user) {
      throw createErrors(404, "User not found.");
    }

    const result = await User.updateOne(
      { _id: _id },
      {
        $set: {
          name: updatedData.name || name,
          email: updatedData.email || email,
          mobile: updatedData.mobile || mobile,
          shop_info: {
            shop_name: updatedData.shopName || shop_name,
            logo: updatedData.logo || logo,
            address: {
              address: updatedData.address || address?.address,
              district: updatedData.district || address?.district,
              division: updatedData.division || address?.division,
            },
            pageOr_webLink: updatedData.webOrPageLink || pageOr_webLink,
            description: updatedData.description || description,
          },
          payments: {
            account_no: updatedData.paymentNumber || account_no,
            payment_method: updatedData.payment_method || payment_method,
            subscription: {
              method: updatedData.method || subscription?.method,
              discount: updatedData.discount || subscription?.discount,
              fee: updatedData.signUpFee || subscription?.fee,
            },
          },
          withdraw: {
            account_no: updatedData.withdrawAccountNo || withdraw?.account_no,
            method: updatedData.withdrawMethod || withdraw?.method,
          },
          settings: {
            receive_email: Object.prototype.hasOwnProperty.call(updatedData, "receiveEmail")
              ? updatedData.receiveEmail
              : settings?.receive_email,
          },
        },
      },
      { upsert: true },
      { new: true } // Create a new user if it doesn't exist
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User information updated successfully.",
      payload: { updatedUserInfo: result }, // Optionally, you can send back the result of the update operation
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);
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
          domain: "localhost",
          path: "/",
          httpOnly: true,
          sameSite: "None",
          secure: true,
          expires: new Date(Date.now() + 20000 * 60 * 24),
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

//update user profile
const changeUserProfile = async (req, res, next) => {
  try {
    const { name, profile_pic } = req.body;
    const updateDoc = {
      name,
      profile_pic,
    };
    await User.findOneAndUpdate({ _id: req.user._id }, { $set: updateDoc });
    return successResponse(res, { message: "updated successfully." });
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
    console.log(req.body);
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
        return errorResponse(res, 400, "Old password did not match.");
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
  updateUserProfile,
  changeUserProfile,
  logOutUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
