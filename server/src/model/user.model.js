const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    user_id: {
      type: String,
      require: true,
      unique: true,
    },
    reseller_id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "reseller", "admin"],
    },
    mobile: {
      type: String,
      require: true,
      unique: true
    },
    profile_pic: {
      type: String,
    },
    shop_info: {
      shop_name: {
        type: String,
      },
      logo: {
        type: String,
      },
      address: {
        address: String,
        division: String,
        district: String,
      },
      description: String,
      pageOr_webLink: String,
    },
    payments: {
      account_no: { type: Number },
      payment_method: { type: String },
      subscription: {
        method: {
          type: String,
          enum: ["BKash", "stripe"],
        },
        discount: Number,
        fee: Number,
      },
    },
    withdraw: {
      account_no: { type: Number },
      method: { type: String },
    },
    balance: { type: Number },
    settings: {
      receive_email: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
