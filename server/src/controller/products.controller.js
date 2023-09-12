const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

const highlightProducts = async (req, res, next) => {
  try {
    const topRatedProducts = await Products.find()
      .sort({ ratings: -1 })
      .limit(3);
    const topSellingProducts = await Products.find()
      .sort({ totalSold: -1 })
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

module.exports = { highlightProducts };
