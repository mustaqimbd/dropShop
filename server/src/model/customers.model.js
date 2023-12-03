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
    delivery_address: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customersSchema);

module.exports = Customer;
