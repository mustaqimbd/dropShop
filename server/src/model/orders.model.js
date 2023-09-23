const { Schema, model } = require("mongoose");

const allowedStatus = ["Pending", "On the way", "Completed", "Canceled"];
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_slug: {
      type: String,
      required: true,
    },
    single_price: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: allowedStatus,
      default: "Pending",
      required: true,
    },
    drop_seller_email: {
      type: String,
      required: true,
    },
    customer: { customerSchema },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    completed_date: {
      type: Date,
      validate: {
        validator: function (value) {
          return value === null || value instanceof Date;
        },
        message: "Value must be a Date or null.",
      },
    },

    category_slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = model("orders", orderSchema);

module.exports = Orders;
