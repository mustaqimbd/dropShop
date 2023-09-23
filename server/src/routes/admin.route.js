const {
  addProduct,
  adminStats,
  dailySales,
  currentMonthEveryDaySales,
  yearlySales,
  orderOverview,
  recentOrders,
  newCustomers,
  totalOrders,
  productStatistics,
  topCategories,
} = require("../controller/admin.controller");
const isAdmin = require("../middleware/isAdmin");
const passport = require("passport");

const adminRoute = require("express").Router();

//TODO: Secure admin routes.
// adminRoute.use(passport.authenticate("jwt", { session: false }), isAdmin);

//add product
// /api/admin/add-product
adminRoute.post("/add-product", addProduct);

/*=======================
      dashboard
=========================*/

//admin stats
// /api/admin/dashboard/stats
adminRoute.get("/dashboard/stats", adminStats);

// Daily sales in every hour
// /api/admin/dashboard/daily-sales
adminRoute.get("/dashboard/daily-sales", dailySales);

// Current month sales in every days.
// /api/admin/dashboard/current-month-sales
adminRoute.get("/dashboard/current-month-sales", currentMonthEveryDaySales);

//yearly sales
// /api/admin/dashboard/yearly-sales
adminRoute.get("/dashboard/yearly-sales", yearlySales);

//Order overview
// /api/admin/dashboard/order-overview
adminRoute.get("/dashboard/order-overview", orderOverview);

//total orders
// /api/admin/dashboard/total-orders
adminRoute.get("/dashboard/total-orders", totalOrders);

//recent orders
// /api/admin/dashboard/recent-orders
adminRoute.get("/dashboard/recent-orders", recentOrders);

// new customers
// /api/admin/dashboard/new-customers
adminRoute.get("/dashboard/new-customers", newCustomers);

// Product statistics
// /api/admin/dashboard/product-statistics
adminRoute.get("/dashboard/product-statistics", productStatistics);

// Top categories
// /api/admin/dashboard/top-categories
adminRoute.get("/dashboard/top-categories", topCategories);

module.exports = adminRoute;
