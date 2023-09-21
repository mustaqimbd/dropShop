const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  img: String,
  name: String,
  slug: String,
});

const Category = model("Categories", categorySchema);

module.exports = Category;
