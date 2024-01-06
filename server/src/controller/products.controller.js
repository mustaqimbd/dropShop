const Category = require("../model/category.model");
const Products = require("../model/products.model");
const { successResponse } = require("./responseHandler");

const bannerProducts = async (req, res, next) => {
  try {
    const products = await Products.aggregate([
      { $match: { hot: true } },
      { $sample: { size: 5 } },
      {
        $project: {
          product_name: 1,
          "images.link": 1,
          reseller_price: 1,
          discount: 1,
          hot: 1,
        },
      },
    ]);
    return successResponse(res, { payload: { products } });
  } catch (error) {
    next(error);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const categorySlug = req.params.slug;
    const categoryDetails = await Category.findOne({
      slug: categorySlug,
    }).select({
      properties: 1,
      slug: 1,
    });
    const products = await Products.find({ category_slug: categorySlug })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Products.countDocuments({
      category_slug: categorySlug,
    });
    return successResponse(res, {
      message: "Get product filtering by category.",
      payload: { products, count, categoryDetails },
    });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Products.findOne({
      product_slug: req.params.productSlug,
    });
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

const productsBySmartFilter = async (req, res, next) => {
  try {
    const { category_slug, currentPage = 1 } = req.query;
    const { ratings, checkboxFilters, priceRange } = req.body;
    const baseQuery = {
      category_slug,
      reseller_price: { $gte: priceRange[0], $lte: priceRange[1] },
      ratings: ratings
        ? { $gte: ratings, $lt: ratings + 1 }
        : { $gte: 1, $lte: 5 },
    };
    const query = { ...baseQuery };
    if (checkboxFilters) {
      const checkBoxFilterQuery = checkboxFilters.map(checkboxFilter => ({
        properties: {
          $elemMatch: {
            name: checkboxFilter.propsName,
            value: { $in: checkboxFilter.values },
          },
        },
      }));
      query.$and = checkBoxFilterQuery;
    }
    const pipeline = [
      {
        $match: query,
      },
      {
        $facet: {
          data: [
            { $skip: Number((currentPage - 1) * 10) || 0 }, // Adjust the skip value for pagination
            { $limit: 10 }, // Adjust the limit value for pagination
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ];
    const result = await Products.aggregate(pipeline);
    return successResponse(res, {
      payload: {
        result: result[0].data,
        totalCount: result[0].totalCount[0] ? result[0].totalCount[0].total : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bannerProducts,
  getProductsByCategory,
  getProductDetails,
  highlightProducts,
  productByPagination,
  productBySlug,
  productsByCategorySlug,
  productsBySmartFilter,
};
