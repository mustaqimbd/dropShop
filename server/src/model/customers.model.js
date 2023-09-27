const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
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
    type: Number,
    required: true,
  },
  address: {
    division: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
});

const Customer = mongoose.model("customer", customersSchema);

module.exports = Customer;
