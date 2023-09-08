const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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
    bcrypt.hash(password, 10, async (err, hash) => {
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
      return res
        .status(201)
        .json({ success: true, message: "User created successfully." });
    });
  } catch (error) {
    next(error);
  }
};

//login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User is not registered." });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const payLoad = {
          id: user._id,
          email: user.email,
        };
        const token = jwt.sign(payLoad, config.jwt.token, {
          expiresIn: "2d",
        });
        return res.status(200).json({
          success: true,
          user: {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          token: `Bearer ${token}`,
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
    const data = {
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { registerNewUser, loginUser, userProfile };
