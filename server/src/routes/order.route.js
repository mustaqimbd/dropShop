const passport = require("passport");

const {
  trackOrder,
  getOrderInfo,
  updateOrderStatus,
  orderCount,
} = require("../controller/order.controller");
const isAdmin = require("../middleware/isAdmin");

const orderRoute = require("express").Router();

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
