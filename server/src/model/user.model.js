const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    user_id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "seller", "admin"],
    },
    phone: {
      type: Number,
    },
    profile_pic: {
      type: String,
    },
    shop_info: {
      shop_name: {
        type: String,
      },
      logo: String,
      address: {
        division: String,
        district: String,
      },
      description: String,
      pageOrWebLink: String,
    },
    payments: {
      withdraw: {
        method: String,
        payouts: Number,
      },
      subscription: {
        method: {
          type: String,
          enum: ["bkash", "stripe"],
        },
        discount: Number,
        fee: Number,
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
