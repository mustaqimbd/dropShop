const {
  addToCart,
  resetCart,
  updateToCart,
  getFromCart,
} = require("../controller/cart.controller");
const cartRouter = require("express").Router();

// API endpoint to handle adding items to the guest cart
// /api/cart
cartRouter.post("/", addToCart);

// /api/cart/get-cart
cartRouter.get("/get-cart", getFromCart);

// /api/cart/update-cart
cartRouter.patch("/update-cart", updateToCart);

// /api/cart/reset-cart/:customerId
cartRouter.delete("/reset-cart/:customerId", resetCart);

module.exports = cartRouter;
