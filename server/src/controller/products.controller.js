const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

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

const totalProductsCount = async (req, res, next) => {
  try {
    const productCount = await Products.countDocuments();
    return successResponse(res, {
      message: "All products count",
      payload: { productCount },
    });
  } catch (error) {
    next(error);
  }
};

const productByPagination = async (req, res, next) => {
  try {
    const { page = 0, limit = 20 } = req.query;
    const products = await Products.find()
      .skip(parseInt(page * limit))
      .limit(parseInt(limit))
      .select({
        product_name: 1,
        images: 1,
        ratings: 1,
        reseller_price: 1,
      });
    const productsInfo = {
      skip: parseInt(page * limit),
      limit: parseInt(limit),
      length: products.length,
    };
    return successResponse(res, {
      statusCode: 200,
      message: "Product by pagination.",
      payload: { productsInfo, products },
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
  highlightProducts,
  productByPagination,
  totalProductsCount,
  productBySlug,
  productsByCategorySlug,
};
