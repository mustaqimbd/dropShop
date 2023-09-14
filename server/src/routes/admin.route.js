const { addProduct } = require("../controller/admin.controller");
const isAdmin = require("../middleware/isAdmin");
const passport = require("passport");

const adminRoute = require("express").Router();

//add product
// /api/admin/add-product
adminRoute.post(
  "/add-product",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addProduct
);

module.exports = adminRoute;
