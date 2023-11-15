const { addToCart } = require("../controller/cart.controller");

const cartRouter = require("express").Router();

// API endpoint to handle adding items to the guest cart
// /api/cart
cartRouter.post("/", addToCart);

module.exports = cartRouter;
