const Products = require("../model/products.model");
const generateUniqueId = require("generate-unique-id");
const { successResponse, errorResponse } = require("./responseHandler");
const Orders = require("../model/order.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");
const createError = require("http-errors");

const addProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      images,
      ratings,
      reseller_price,
      warranty,
      description,
      category,
      discount,
      properties,
      quantity,
    } = req.body;
    const newProduct = new Products({
      product_name,
      product_id: generateUniqueId({
        length: 8,
      }).toUpperCase(),
      images: images?.map(image => {
        return {
          link: image,
        };
      }),
      ratings: parseFloat(ratings),
      reseller_price: parseFloat(reseller_price),
      suggested_price: parseInt(reseller_price) + (reseller_price * 15) / 100, // 10%
      warranty: parseInt(warranty),
      category: category[0],
      available_quantity: parseInt(quantity),
      description,
      discount: parseInt(discount),
      properties,
      product_slug: `${product_name.split(" ").join("-").toLowerCase()}`,
      category_slug: category[1],
    });
    await newProduct.save();
    return successResponse(res, {
      statusCode: 201,
      message: "Product created successfully.",
    });
  } catch (error) {
    next(error);
  }
};
const adminStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lesThanValue = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const dailyUsers = await User.find({
      createdAt: {
        $gte: today,
        $lt: lesThanValue,
      },
    }).countDocuments();
    const dailyOrders = await Orders.find({
      createdAt: {
        $gte: today,
        $lt: lesThanValue,
      },
    }).countDocuments();
    const dailySales = await Orders.find({
      status: "completed",
      completed_date: {
        $gte: today,
        $lt: lesThanValue,
      },
    });
    // calculate daily total revenue
    let dailyRevenue = dailySales.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total_cost,
      0
    );
    // dailyRevenue = parseFloat(dailyRevenue.toFixed(2));
    return successResponse(res, {
      message: "Admin dashboard stats",
      payload: { dailyUsers, dailyOrders, dailyRevenue },
    });
  } catch (error) {
    next(error);
  }
};
const dailySales = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);
    const pipeline = [
      {
        $match: {
          status: "completed",
          completed_date: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $project: {
          hour: {
            $hour: {
              date: "$completed_date",
              timezone: "UTC",
            },
          },
          total_cost: 1,
        },
      },
      {
        $group: {
          _id: "$hour",
          total_sales: { $sum: "$total_cost" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    const sales = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "Daily sales here",
      payload: { sales },
    });
  } catch (error) {
    next(error);
  }
};
const currentMonthEveryDaySales = async (req, res, next) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the current month
    const firstDayOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const pipeline = [
      {
        $match: {
          status: "completed",
          createdAt: {
            $gte: firstDayOfMonth,
            $lt: firstDayOfNextMonth,
          },
        },
      },
      {
        $addFields: {
          dayOfMonth: { $dayOfMonth: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$dayOfMonth",
          totalSales: { $sum: "$total_cost" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const sales = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "Last month sales here.",
      payload: { sales },
    });
  } catch (error) {
    next(error);
  }
};
const yearlySales = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $match: {
          status: "completed",
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          total_cost: 1,
        },
      },
      {
        $group: {
          _id: "$year",
          total_sales: { $sum: "$total_cost" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const sales = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "Yearly total sales",
      payload: {
        sales,
      },
    });
  } catch (error) {
    next(error);
  }
};
const orderOverview = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ];
    const orderOverview = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "Order overview",
      payload: {
        orderOverview,
      },
    });
  } catch (error) {
    next(error);
  }
};
const totalOrders = async (req, res, next) => {
  try {
    const totalOrderCount = await Orders.find().countDocuments();
    return successResponse(res, {
      message: "Total orders count.",
      payload: { totalOrderCount },
    });
  } catch (error) {
    next(error);
  }
};
const recentOrders = async (req, res, next) => {
  try {
    const { page = 0 } = req.query;
    const limit = 5;
    const skip = page * limit;
    const pipeline = [
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "users",
                localField: "reseller_id",
                foreignField: "user_id",
                as: "seller_info",
              },
            },
            {
              $unwind: "$seller_info",
            },
            {
              $project: {
                total_cost: 1,
                status: 1,
                order_id: 1,
                createdAt: 1,
                seller: {
                  name: "$seller_info.name",
                  email: "$seller_info.email",
                  profile_pic: "$seller_info.profile_pic",
                },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [
            {
              $count: "total_orders",
            },
          ],
        },
      },
    ];
    const orders = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "5 recent orders",
      payload: {
        skip,
        limit,
        length: orders[0]?.totalCount[0]?.total_orders,
        orders: orders[0]?.data,
      },
    });
  } catch (error) {
    next(error);
  }
};
const topSellers = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$reseller_id",
          total_orders: { $sum: 1 },
          total_amount: { $sum: "$total_cost" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "user_id",
          as: "user_info",
        },
      },
      {
        $unwind: "$user_info",
      },
      {
        $project: {
          _id: 1,
          total_orders: 1,
          total_amount: 1,
          seller_name: "$user_info.name",
          seller_email: "$user_info.email",
          profile_pic: "$user_info.profile_pic",
        },
      },
      {
        $sort: { total_orders: -1 },
      },
      {
        $limit: 5,
      },
    ];

    const sellers = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "Top sellers",
      payload: { sellers },
    });
  } catch (error) {
    next(error);
  }
};
const productStatistics = async (req, res, next) => {
  try {
    const totalCategory = await Category.find().countDocuments();
    const pipeline = [
      {
        $group: {
          _id: null,
          totalAvailableQuantity: { $sum: "$available_quantity" },
        },
      },
    ];
    const inStock = await Products.aggregate(pipeline);
    const outOfStocks = await Products.count({ available_quantity: 0 });
    return successResponse(res, {
      message: "Products statistics.",
      payload: {
        totalCategory,
        inStock: inStock[0].totalAvailableQuantity,
        outOfStocks,
      },
    });
  } catch (error) {
    next(error);
  }
};
const topCategories = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$category_slug",
          total_sales: { $sum: "$total_sold" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "slug",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $sort: {
          total_sales: -1,
        },
      },
      {
        $project: {
          _id: 0,
          category_slug: "$_id",
          total_sales: 1,
          category_info: 1,
        },
      },
      {
        $group: {
          _id: null,
          total_all_categories: { $sum: "$total_sales" },
          categories: {
            $push: {
              category_slug: "$category_slug",
              total_sales: "$total_sales",
              category_info: "$category_info",
            },
          },
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          category_slug: "$categories.category_slug",
          total_sales: "$categories.total_sales",
          category_name: "$categories.category_info.name",
          category_img: "$categories.category_info.img",
          percentage: {
            $multiply: [
              { $divide: ["$categories.total_sales", "$total_all_categories"] },
              100,
            ],
          },
        },
      },
      {
        $sort: {
          total_sales: -1,
        },
      },
      {
        $limit: 5,
      },
    ];

    const topCategories = await Products.aggregate(pipeline);
    return successResponse(res, {
      message: "Top categories",
      payload: { topCategories },
    });
  } catch (error) {
    next(error);
  }
};
const sellersInfo = async (req, res, next) => {
  try {
    const projection = {
      _id: 0,
      name: 1,
      profile_pic: 1,
      "payments.withdraw.payouts": 1,
      createdAt: 1,
      email: 1,
    };
    if (req.query.email) {
      const seller = await User.findOne({
        email: req.query.email,
        role: "reseller",
      }).select(projection);
      if (seller) {
        return successResponse(res, {
          message: "Sellers info",
          payload: { sellers: [seller] },
        });
      } else {
        return successResponse(res, {
          message: "No seller found with this email.",
          payload: { sellers: [] },
        });
      }
    }
    const sellers = await User.find({ role: "reseller" }).select(projection);
    return successResponse(res, {
      message: sellers.length ? "Sellers info" : "You have no resellers.",
      payload: { sellers },
    });
  } catch (error) {
    next(error);
  }
};
const products = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = page * limit;
    const pipeline = [
      {
        $facet: {
          totalProducts: [
            {
              $count: "total",
            },
          ],
          products: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $project: {
                product_name: 1,
                product_id: 1,
                "images.link": 1,
                available_quantity: 1,
                total_sold: 1,
                product_slug: 1,
                available_quantity: 1,
              },
            },
          ],
        },
      },
    ];
    const result = await Products.aggregate(pipeline);
    return successResponse(res, {
      message: "Products info.",
      payload: {
        length: result[0]?.products?.length,
        skip,
        limit,
        total: result[0]?.totalProducts[0]?.total,
        products: result[0]?.products,
      },
    });
  } catch (error) {
    next(error);
  }
};
const productsById = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const singleProduct = await Products.findOne({
      product_id: productId,
    }).select({
      createdAt: 0,
      updatedAt: 0,
      total_sold: 0,
      product_id: 0,
    });
    if (!singleProduct) {
      throw createError(404, "No item found with this id.");
    }
    return successResponse(res, {
      message: "Single product details.",
      payload: { singleProduct },
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { product_id } = req.query;
    await Products.findOneAndDelete({ product_id });
    return successResponse(res, {
      message: "Deleted successfully.",
      payload: undefined,
    });
  } catch (error) {
    next(error);
  }
};
const updateProductInfo = async (req, res, next) => {
  try {
    const {
      id,
      product_name,
      quantity,
      reseller_price,
      warranty,
      ratings,
      discount,
      hot,
      is_active,
      description,
    } = req.body;

    const updatedDoc = {
      product_name,
      quantity: parseFloat(quantity),
      reseller_price: parseFloat(reseller_price),
      warranty: parseFloat(warranty),
      ratings: parseFloat(ratings),
      discount: parseFloat(discount),
      hot,
      is_active,
      description,
    };
    await Products.updateOne({ _id: id }, updatedDoc);
    return successResponse(res, {
      message: "Updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
const updateImages = async (req, res, next) => {
  const { id, imgUrls } = req.body;
  if (!id || !imgUrls) {
    return errorResponse(res, 401, "Fake request");
  }
  const images = imgUrls.map(img => {
    return {
      link: img,
    };
  });
  try {
    const query = {
      $push: {
        images: {
          $each: images,
        },
      },
    };
    await Products.updateOne({ _id: id }, query);
    return successResponse(res, { message: "Images updated successfully." });
  } catch (error) {
    next(error);
  }
};
const deleteProductImage = async (req, res, next) => {
  try {
    const { productId, imageId } = req.body;
    if (!productId || !imageId) {
      return errorResponse(res, 401, "Fake request");
    }
    await Products.updateOne(
      { _id: productId },
      { $pull: { images: { _id: imageId } } }
    );
    return successResponse(res, { message: "Image deleted successfully." });
  } catch (error) {
    next(error);
  }
};
const updateProductCategory = async (req, res, next) => {
  try {
    const { productId, category, productProperties } = req.body;
    if (!productId || category.length !== 2) {
      return errorResponse(res, 403, "Fake request.");
    }
    const product = await Products.findById(productId);
    product.category = category[0];
    product.category_slug = category[1];
    product.properties = productProperties;
    await product.save();
    return successResponse(res, { message: "Category updated successfully." });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addProduct,
  adminStats,
  dailySales,
  currentMonthEveryDaySales,
  yearlySales,
  orderOverview,
  recentOrders,
  topSellers,
  totalOrders,
  productStatistics,
  topCategories,
  sellersInfo,
  products,
  deleteProduct,
  productsById,
  updateProductInfo,
  updateImages,
  deleteProductImage,
  updateProductCategory,
};
