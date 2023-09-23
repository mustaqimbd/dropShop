const Products = require("../model/products.model");
const generateUniqueId = require("generate-unique-id");
const { successResponse } = require("./responseHandler");
const Orders = require("../model/orders.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");

const addProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      image,
      ratings,
      reseller_price,
      suggested_price,
      warranty,
      available_quantity,
      description,
    } = req.body;
    const newProduct = new Products({
      product_name,
      product_id: generateUniqueId({
        length: 8,
      }).toUpperCase(),
      images: [
        {
          link: image,
        },
      ],
      ratings: parseFloat(ratings),
      reseller_price: parseFloat(reseller_price),
      suggested_price: parseFloat(suggested_price),
      warranty,
      available_quantity: parseInt(available_quantity),
      description,
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
    const dailySells = await Orders.find({
      status: "Completed",
      completed_date: {
        $gte: today,
        $lt: lesThanValue,
      },
    });
    let dailyRevenue = dailySells.reduce(
      (total, product) => total + product.total_price,
      0
    );
    dailyRevenue = parseFloat(dailyRevenue.toFixed(2));
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
          status: "Completed",
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
          total_price: 1,
        },
      },
      {
        $group: {
          _id: "$hour",
          total_sales: { $sum: "$total_price" },
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
          status: "Completed",
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
          totalSales: { $sum: "$total_price" },
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
          status: "Completed",
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          total_price: 1,
        },
      },
      {
        $group: {
          _id: "$year",
          total_sales: { $sum: "$total_price" },
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
    const { skip = 0, limit = 5 } = req.query;
    const orders = await Orders.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip * limit);
    return successResponse(res, {
      message: "10 recent orders",
      payload: {
        skip: skip * limit,
        limit: parseInt(limit),
        length: orders.length,
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

const newCustomers = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$drop_seller_email",
          orderCount: { $sum: 1 },
          totalSales: { $sum: "$total_price" },
        },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "_id", // Field from the orders collection
          foreignField: "email", // Field from the users collection
          as: "userDetails", // Alias for the joined data
        },
      },
      {
        $unwind: "$userDetails", // Unwind the array created by $lookup
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          email: "$_id",
          orderCount: 1,
          userName: "$userDetails.name",
          totalSales: 1,
          logo: "$userDetails.logo",
          profile_pic: "$userDetails.profile_pic",
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
      {
        $limit: 5,
      },
    ];
    const customers = await Orders.aggregate(pipeline);
    return successResponse(res, {
      message: "New customers",
      payload: { customers },
    });
  } catch (error) {
    next(error);
  }
};

const productStatistics = async (req, res, next) => {
  try {
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
        inStock: inStock[0].totalAvailableQuantity,
        outOfStocks,
      },
    });
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
  newCustomers,
  totalOrders,
  productStatistics,
};
