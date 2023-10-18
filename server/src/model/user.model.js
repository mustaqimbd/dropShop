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
    reseller_id: {
      type: String,
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
      type: String,
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
      pageOr_webLink: String,
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
    settings: {
      receiveEmail: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
