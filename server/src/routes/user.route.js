const userRoute = require("express").Router();
const {
  registerNewUser,
  loginUser,
  userProfile,
  logOutUser,
  changePassword,
} = require("../controller/user.controller");
const isTokenAvailable = require("../middleware/isTokenAvailable");
const limitRequest = require("../middleware/limitRequest");
const { runValidation } = require("../validation/runValidation");
const { userValidate } = require("../validation/user.validate");
const passport = require("passport");

//register a new user
userRoute.post(
  "/register",
  limitRequest,
  userValidate,
  runValidation,
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
userRoute.post("/login", limitRequest, loginUser);

/**
 @body ={
  email:"",*
  password:"",*
 }
  (*) marked filed's are required.  
 * */

//get user profile
userRoute.get(
  "/profile",
  isTokenAvailable,
  passport.authenticate("jwt", { session: false }),
  userProfile
);

//change password
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
userRoute.post("/logout", logOutUser);

module.exports = userRoute;
