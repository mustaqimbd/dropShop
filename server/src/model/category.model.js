const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  img: String,
  name: String,
  slug: String,
});

const Category = model("Categories", categoryModel);

module.exports = Category;
