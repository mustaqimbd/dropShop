const passport = require("passport");

const categoryRoute = require("express").Router();
const {
  getAllCategory,
  addNewCategory,
} = require("../controller/category.controller");
const isAdmin = require("../middleware/isAdmin");

//get all category
// /api/category/
categoryRoute.get("/", getAllCategory);

//add new category admin protected
// /api/category/
categoryRoute.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addNewCategory
);

module.exports = categoryRoute;
