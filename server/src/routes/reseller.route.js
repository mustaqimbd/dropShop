const {
  addCustomer,
  getCustomers,
  updateCustomer,
  searchCustomer,
  getMyOrders,
  searchOrder,
} = require("../controller/reseller.controller");
const {
  validateEmail,
  validateMobile,
  runValidation,
} = require("../validation/validate");

const resellerRoute = require("express").Router();

//TODO: Secure reseller routes.
// resellerRoute.use(passport.authenticate("jwt", { session: false }), isReseller);

/*=======================
     reseller dashboard
=========================*/

//add customer
// /api/reseller/dashboard/add-customer
resellerRoute.post(
  "/dashboard/add-customer",
  validateEmail,
  validateMobile,
  runValidation,
  addCustomer
);

// get customers
// /api/reseller/dashboard/my-customers
resellerRoute.get("/dashboard/my-customers", getCustomers);

// update customers
// /api/reseller/dashboard/my-customers
resellerRoute.patch(
  "/dashboard/my-customers",
  validateEmail,
  validateMobile,
  runValidation,
  updateCustomer
);

//search customer
// /api/reseller/dashboard/my-customers/:reseller_id/search
resellerRoute.get("/dashboard/my-customers/:reseller_id/search", getCustomers);

// get orders
// /api/reseller/dashboard/my-orders/:reseller_id
resellerRoute.get("/dashboard/my-orders/:reseller_id", getMyOrders);

// search orders
// /api/reseller/dashboard/my-orders/:reseller_id/search
resellerRoute.get("/dashboard/my-orders/:reseller_id/search", getMyOrders);

module.exports = resellerRoute;
