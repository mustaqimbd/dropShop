const { trackOrder } = require("../controller/order.controller");

const orderRoute = require("express").Router();

//track order
orderRoute.get("/track-order", trackOrder);

module.exports = orderRoute;
