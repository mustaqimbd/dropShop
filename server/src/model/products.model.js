const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  link: String,
});

const productsSchema = new Schema(
  {
    product_name: String,
    product_id: {
      type: String,
      unique: true,
    },
    images: [imageSchema],
    ratings: Number,
    reseller_price: Number,
    suggested_price: Number,
    warranty: String,
    available_quantity: Number,
    total_sold: {
      type: Number,
      default: 0,
    },
    description: String,
    hot: Boolean,
    discount: Number,
    category: String,
    product_slug: String,
    category_slug: String,
    totalSold: { type: Number, default: 0 },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = model("Products", productsSchema);

module.exports = Products;
