const { Schema, model } = require("mongoose");

const withdrawSchema = new Schema({
  reseller_id: { type: String, require: true },
  amount: { type: Number, require: true },
  payment_method: { type: String, require: true },
  date: { type: String, require: true },
  notes: String,
});

const Withdraw = model("withdraw", withdrawSchema);

module.exports = Withdraw
