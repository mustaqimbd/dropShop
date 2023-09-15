const userRoute = require("express").Router();
const {
  registerNewUser,
  loginUser,
  userProfile,
  logOutUser,
  changePassword,
  requestRegister,
} = require("../controller/user.controller");
const isTokenAvailable = require("../middleware/isTokenAvailable");
const limitRequest = require("../middleware/limitRequest");
const { runValidation } = require("../validation/runValidation");
const { userValidate } = require("../validation/user.validate");
const passport = require("passport");

//process register
// /api/user/process-register
userRoute.post(
  "/request-register",
  userValidate,
  runValidation,
  requestRegister
);

//register a new user
// /api/user/register
userRoute.post("/register", limitRequest, registerNewUser);
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
  isTokenAvailable,
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

/**
 @body ={
  previousPassword:""*,
  newPassword:""*
 }
 * */

//logout user
// /api/user/logout
userRoute.post("/logout", logOutUser);

module.exports = userRoute;
