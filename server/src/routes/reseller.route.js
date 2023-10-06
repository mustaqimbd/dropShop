const {
  addCustomer,
  getCustomers,
  updateCustomer,
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
resellerRoute.patch(
  "/dashboard/my-customers",
  validateEmail,
  validateMobile,
  runValidation,
  updateCustomer
);

module.exports = resellerRoute;
