const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    sessionId: String,
    customerId: String,
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        resellerPrice: {
          type: Number,
          required: true,
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3 * 24 * 60 * 60 }); // or 259200 seconds for 3 days

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
