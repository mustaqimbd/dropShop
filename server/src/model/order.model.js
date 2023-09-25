const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    unique: true,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_slug: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  advanced_from_customer: {
    type: Number,
    required: true,
  },
  product_slug: {
    type: String,
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
