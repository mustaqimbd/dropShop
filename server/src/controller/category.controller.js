const Category = require("../model/category.model");
const { successResponse } = require("./responseHandler");

const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    return successResponse(res, {
      statusCode: 200,
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
      statusCode: 200,
      message: "New category added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategory, addNewCategory };
