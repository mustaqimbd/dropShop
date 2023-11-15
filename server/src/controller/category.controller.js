const Category = require("../model/category.model");
const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

const getAllCategory = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$category_slug",
          total_products: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "slug",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: "$category._id",
          slug: "$_id",
          name: "$category.name",
          total_products: 1,
          img: "$category.img",
          properties: "$category.properties",
        },
      },
    ];
    const category = await Products.aggregate(pipeline);
    return successResponse(res, {
      message: "All categories.",
      payload: { category },
    });
  } catch (error) {
    next(error);
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    const { img, name, slug } = req.body;
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

//Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.id;
    const result = await Category.findByIdAndDelete(categoryID);
    return successResponse(res, {
      statusCode: 200,
      message: "Category Deleted successfully.",
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

module.exports = {
  getAllCategory,
  addNewCategory,
  filterByCategory,
  updateCategory,
  deleteCategory,
};
