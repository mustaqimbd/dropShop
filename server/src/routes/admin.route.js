const {
  addProduct,
  adminStats,
  dailySales,
  currentMonthEveryDaySales,
  yearlySales,
  orderOverview,
  recentOrders,
  totalOrders,
  productStatistics,
  topCategories,
  sellersInfo,
  topSellers,
  products,
  deleteProduct,
  productsById,
  updateProductInfo,
  updateImages,
  deleteProductImage,
  updateProductCategory,
} = require("../controller/admin.controller");
const { isAdmin } = require("../middleware/checkRole");
const passport = require("passport");

const adminRoute = require("express").Router();

//TODO: Secure admin routes.
adminRoute.use(passport.authenticate("jwt", { session: false }), isAdmin);

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
adminRoute.get("/dashboard/top-sellers", topSellers);

// Product statistics
// /api/admin/dashboard/product-statistics
adminRoute.get("/dashboard/product-statistics", productStatistics);

// Top categories
// /api/admin/dashboard/top-categories
adminRoute.get("/dashboard/top-categories", topCategories);

// Sellers info
// /api/admin/dashboard/sellers-info
adminRoute.get("/dashboard/sellers-info", sellersInfo);

// All products
// /api/admin/dashboard/products
adminRoute.get("/dashboard/products", products);

// Product by id
// /api/admin/dashboard/product-by-id
adminRoute.get("/dashboard/product-by-id", productsById);

// Delete a product
// /api/admin/dashboard/delete-product
adminRoute.delete("/dashboard/delete-product", deleteProduct);

// Update product info
// /api/admin/dashboard/update-product-info
adminRoute.put("/dashboard/update-product-info", updateProductInfo);

// Update product image
// /api/admin/dashboard/update-product-images
adminRoute.put("/dashboard/update-product-images", updateImages);

// Delete image
// /api/admin/dashboard/delete-product-images
adminRoute.put("/dashboard/delete-product-image", deleteProductImage);

// Update category
// /api/admin/dashboard/update-product-category
adminRoute.put("/dashboard/update-product-category", updateProductCategory);

module.exports = adminRoute;
