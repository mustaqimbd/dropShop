const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
    },
    reseller_id: {
      type: String,
      required: true,
    },
    customer_name: {
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
    address: {
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
