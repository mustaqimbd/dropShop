const {
  addToCart,
  resetCart,
  updateToCart,
  getFromCart,
} = require("../controller/cart.controller");
const cartRouter = require("express").Router();
const session = require("express-session");
const { sessionSecretKey } = require("../secret");

cartRouter.use(
  session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "Lax", // or "Strict"
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      // maxAge: 60 * 1000, // 1 minute in milliseconds
    },
  })
);

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
