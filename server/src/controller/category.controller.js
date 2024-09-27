const Category = require("../model/category.model");
const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

const addNewCategory = async (req, res, next) => {
  try {
    const { img, name } = req.body;
    const slug = name
      .split(" ")
      .join("-")
      .split("'")
      .join("")
      .toLocaleLowerCase();
    const newCategory = new Category({
      img,
      name,
      slug,
    });
    await newCategory.save();
    return successResponse(res, {
      message: "New category added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 14;
  try {
    const category = await Category.find().skip((page - 1) * limit)
      .limit(limit);
    return successResponse(res, {
      message: "All categories.",
      payload: { category },
    });
  } catch (error) {
    next(error);
  }
};

//update category for insert new properties
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const newProperty = req.body;

    // Retrieve the category document by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Define the new properties

    // Add the new properties to the category

    category.properties.push(newProperty);

    // Save the updated category document
    const updatedCategory = await category.save();
    return successResponse(res, {
      statusCode: 200,
      message: "Property Added successfully.",
      payload: { updatedCategory },
    });
  } catch (err) {
    next(err);
  }
};

const filterByCategory = async (req, res, next) => {
  try {
    const categorySlug = req.params.slug;
    const products = await Products.find({ category_slug: categorySlug });
    return successResponse(res, {
      message: "Get product filtering by category.",
      payload: { products },
    });
  } catch (error) {
    next(error);
  }
};

//Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.id;
    await Category.findByIdAndDelete(categoryID);
    return successResponse(res, {
      statusCode: 200,
      message: "Category Deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  addNewCategory,
  getAllCategory,
  updateCategory,
  filterByCategory,
  deleteCategory,
};
