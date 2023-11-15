const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

const getProductsByCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const categorySlug = req.params.slug;

    const products = await Products.find({ category_slug: categorySlug })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Products.countDocuments({
      category_slug: categorySlug,
    });
    return successResponse(res, {
      message: "Get product filtering by category.",
      payload: { products, count },
    });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Products.findOne({ product_slug: req.params.productSlug });
    return successResponse(res, { payload: product });
  } catch (error) {
    next(error);
  }
};

const highlightProducts = async (req, res, next) => {
  try {
    const topRatedProducts = await Products.find()
      .sort({ ratings: -1 })
      .limit(3);
    const topSellingProducts = await Products.find()
      .sort({ total_sold: -1 })
      .limit(3);

    return successResponse(res, {
      statusCode: 200,
      message: "Highlight section products.",
      payload: { topRatedProducts, topSellingProducts },
    });
  } catch (error) {
    next(error);
  }
};

const productByPagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const products = await Products.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select({
        product_name: 1,
        images: 1,
        ratings: 1,
        reseller_price: 1,
      });
    const count = await Products.countDocuments();
    return successResponse(res, {
      statusCode: 200,
      message: "Product by pagination.",
      payload: { products, count },
    });
  } catch (error) {
    next(error);
  }
};

const productBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Products.findOne({ product_slug: slug });
    return successResponse(res, {
      message: "Single product by category.",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

const productsByCategorySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const products = await Products.find({
      category_slug: slug,
    }).select({
      _id: 1,
      ratings: 1,
      suggested_price: 1,
      "images.link": 1,
      product_name: 1,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "Products by category.",
      payload: { products },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductsByCategory,
  getProductDetails,
  highlightProducts,
  productByPagination,
  productBySlug,
  productsByCategorySlug,
};
