const passport = require("passport");

const {
  trackOrder,
  getOrderInfo,
  updateOrderStatus,
  createOrder,
} = require("../controller/order.controller");
const { isAdmin } = require("../middleware/checkRole");

const orderRoute = require("express").Router();

//create order
// /api/order/create-order
orderRoute.post(
  "/create-order",
  passport.authenticate("jwt", { session: false }),
  createOrder
);

//track order
// /api/order/track-order
orderRoute.get("/track-order", trackOrder);

// Get all orders
// /api/order/orders
orderRoute.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getOrderInfo
);

// Update order status
// /api/order/update-order-status
orderRoute.post(
  "/update-order-status",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateOrderStatus
);

module.exports = orderRoute;
