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
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        sellingPrice: { type: Number, required: true },
        extraProfit: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total_cost: {
      type: Number,
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
    },
    advance: { type: Number },
    completed_date: {
      type: Date,
      validate: {
        validator: function (value) {
          return value === null || value instanceof Date;
        },
        message: "Only Date or null values are allowed for completed_date",
      },
    },
    reseller_id: { type: String },
    reseller: { type: mongoose.Schema.Types.ObjectId, required: true },
    customer_id: { type: String },
    customer: { type: String },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = OrderModel;
