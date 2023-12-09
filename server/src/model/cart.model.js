const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    sessionId: String,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customer", // Update 'customer' to 'customers'
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
        extraProfit: {
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
