const { trackOrder, getOrderInfo } = require("../controller/order.controller");

const orderRoute = require("express").Router();

//track order
// /api/order/track-order
orderRoute.get("/track-order", trackOrder);

// Get all orders
// /api/order/orders
// TODO: Secure and make admin protected
orderRoute.get("/orders", getOrderInfo);

module.exports = orderRoute;
