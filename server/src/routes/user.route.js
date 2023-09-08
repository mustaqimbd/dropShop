const userRoute = require("express").Router();
const {
  registerNewUser,
  loginUser,
  userProfile,
} = require("../controller/user.controller");
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
userRoute.post("/login", loginUser);

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
  passport.authenticate("jwt", { session: false }),
  userProfile
);

module.exports = userRoute;
