const passport = require("passport");
const {
  addCustomer,
  getCustomers,
  updateCustomer,
  getMyOrders,
  getResentEarning,
  getProfit,
  getWithdrawData,
  getResellerStatics,
  getProfitStatics,
  getProfitOverview,
} = require("../controller/reseller.controller");
const {
  validateEmail,
  validateMobile,
  runValidation,
} = require("../validation/validate");

const resellerRoute = require("express").Router();
const { isReseller } = require("../middleware/checkRole");
// const { updateOrderStatus } = require("../controller/order.controller");

//TODO: Secure reseller routes.
resellerRoute.use(passport.authenticate("jwt", { session: false }), isReseller);

/*=======================
     reseller dashboard
=========================*/

//add customer
// /api/reseller/add-customer
resellerRoute.post(
  "/add-customer",
  validateEmail,
  validateMobile,
  runValidation,
  addCustomer
);

// get customers table data
// /api/reseller/my-customers
resellerRoute.get("/my-customers", getCustomers);

// update customers
// /api/reseller/update-customer
resellerRoute.patch(
  "/update-customer",
  validateEmail,
  validateMobile,
  runValidation,
  updateCustomer
);

//search customer
// /api/reseller/my-customers/search
resellerRoute.get("/my-customers/search", getCustomers);

// get orders
// /api/reseller/my-orders
resellerRoute.get("/my-orders", getMyOrders);

// search orders
// /api/reseller/my-orders/search
resellerRoute.get("/my-orders/search", getMyOrders);

// get reseller panel statistics data
// /api/reseller/reseller-panel-statistics
resellerRoute.get("/reseller-panel-statistics", getResellerStatics);

// get resent earning table data
// /api/reseller/resent-earning
resellerRoute.get("/resent-earning", getResentEarning);

// get profit statistics
// /api/reseller/profit-statistics
resellerRoute.get("/profit-statistics", getProfitStatics);

// get profit overview statistics
// /api/reseller/profit-overview
resellerRoute.get("/profit-overview", getProfitOverview);

// get profit table data
// /api/reseller/profit
resellerRoute.get("/profit", getProfit);

// search profit
// /api/reseller/profit/search
resellerRoute.get("/profit/search", getProfit);

// get withdraw data
// /api/reseller/withdraw
resellerRoute.get("/withdraw", getWithdrawData);

module.exports = resellerRoute;
