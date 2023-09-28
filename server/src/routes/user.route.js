const userRoute = require("express").Router();
const {
  registerNewUser,
  loginUser,
  userProfile,
  logOutUser,
  changePassword,
  requestRegister,
  forgotPassword,
  resetPassword,
  updateUserProfile,
} = require("../controller/user.controller");
const isTokenAvailable = require("../middleware/isTokenAvailable");
const limitReqResettingPass = require("../middleware/limitReqResettingPass");
const limitRequest = require("../middleware/limitRequest");
const validateEmail = require("../validation/email.validate");
const validatePassword = require("../validation/password.validate");
const { runValidation } = require("../validation/runValidation");
const { userValidate } = require("../validation/user.validate");
const passport = require("passport");

//process register
// /api/user/process-register
userRoute.post(
  "/request-register",
  validateEmail,
  validatePassword,
  userValidate,
  runValidation,
  requestRegister
);

//register a new user
// /api/user/register
userRoute.post(
  "/register",
  //  limitRequest,
  registerNewUser
);
/**
  @body ={
    name:"",*
    email:"",*
    password:"",*
    logo:"",
    mobile:"",*
    address:"",*
    district:"",
    webOrPageLink:"",
  }
  (*) marked filed's are required.
 **/

//login a user
// /api/user/login
userRoute.post("/login", limitRequest, loginUser);

/**
 @body ={
  email:"",*
  password:"",*
 }
  (*) marked filed's are required.  
 * */

//get user profile
// /api/user/profile
userRoute.get(
  "/profile",
  // isTokenAvailable,
  passport.authenticate("jwt", { session: false }),
  userProfile
);

//change password
// /api/user/change-password
userRoute.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  changePassword
);

//put Data (Update shop info )
// /api/user/update-dropshipper-info
userRoute.put(
  "/update-dropshipper-info",
  passport.authenticate("jwt", { session: false }),
  updateUserProfile
);

/**
 @body ={
  previousPassword:""*,
  newPassword:""*
 }
 * */

//forgot password
userRoute.post(
  "/forgot-password",
  validateEmail,
  runValidation,
  forgotPassword
);

/**
@body ={
  email:""*
}
 **/

//reset password
userRoute.post(
  "/reset-password",
  limitReqResettingPass,
  validatePassword,
  runValidation,
  resetPassword
);

/**
@body ={
  password:"",
  token:""
}


**/
//logout user
// /api/user/logout
userRoute.post("/logout", logOutUser);

module.exports = userRoute;
