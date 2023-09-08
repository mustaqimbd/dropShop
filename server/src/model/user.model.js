const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  logo: String,
  mobile: Number,
  address: String,
  district: String,
  webOrPageLink: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
