const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      unique: true,
      required: true,
      default: `OID${Date.now()}`,
    },
    ordered_products: [
      {
        product_slug: String,
        quantity: Number,
        advanced: Number,
        unit_price: Number,
      },
    ],
    total_cost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "processing",
        "picked by currier",
        "shifted",
        "completed",
        "canceled",
      ],
      required: true,
    },

    delivery_charge: {
      type: Number,
      required: true,
    },
    completed_date: {
      type: Date,
      validate: {
        validator: function (value) {
          return value === null || value instanceof Date;
        },
        message: "Only Date or null values are allowed for completed_date",
      },
    },
    reseller_id: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = OrderModel;
