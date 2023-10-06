const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    resellerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customersSchema);

module.exports = Customer;
