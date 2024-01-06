const passport = require("passport");
const {
  dropShipperFeePayment,
  orderPayment,orderPaymentSuccess
} = require("../controller/payment.controller");
const { isReseller } = require("../middleware/checkRole");

const paymentsRoute = require("express").Router();

paymentsRoute.use(passport.authenticate("jwt", { session: false }), isReseller);

//routes will be "api/payments/sslcz-join-as-dropshipper"
paymentsRoute.post("/sslcz-join-as-dropshipper", dropShipperFeePayment);

// api/payments/order
paymentsRoute.post("/order", orderPayment);

// api/payments/order/success
paymentsRoute.post("/order/success", orderPaymentSuccess);

module.exports = paymentsRoute;
