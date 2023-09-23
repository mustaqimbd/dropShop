const passport = require("passport");

const categoryRoute = require("express").Router();
const {
  getAllCategory,
  addNewCategory,
  filterByCategory,
  updateCategory,
  deleteCategory,
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

//put for upadte category (Insert Property) |  admin protected
// /api/category/
categoryRoute.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateCategory
);
//Delete category |  admin protected
// /api/category/id
categoryRoute.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteCategory
);

// get products by category
// /api/category/
categoryRoute.get(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  filterByCategory
);

module.exports = categoryRoute;
