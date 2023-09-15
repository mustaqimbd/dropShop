const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    logo: String,
    mobile: Number,
    address: String,
    district: String,
    webOrPageLink: String,
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
