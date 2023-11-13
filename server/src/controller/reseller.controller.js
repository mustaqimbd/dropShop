const { successResponse, errorResponse } = require("./responseHandler");
const Customer = require("../model/customers.model");
const Order = require("../model/order.model");
const Withdraw = require("../model/withdraw.model");
const generateUniqueId = require("generate-unique-id");

const addCustomer = async (req, res, next) => {
  try {
    const { customerName, mobile, email, address, city, country } = req.body;
    const customerId = generateUniqueId({
      length: 8,
    }).toUpperCase();

    const customer = await Customer.findOne({
      $and: [{ reseller_id: req.user.reseller_id }],
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });

    if (customer) {
      return errorResponse(res, 200, "This customer already exists.");
    } else {
      const customerInfo = new Customer({
        customer_id: customerId,
        reseller_id: req.user.reseller_id,
        customer_name: customerName,
        mobile: mobile,
        email: email,
        delivery_address: {
          address: address,
          city: city,
          country: country,
        },
      });
      await customerInfo.save();
      successResponse(res, {
        message: "Customer added successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      query = {
        $and: [{ reseller_id: req.user.reseller_id }],
        $or: [
          { customer_name: searchRegex },
          { email: searchRegex },
          { mobile: searchRegex }, //TODO mobile search problem
        ],
      };
    } else {
      query = { reseller_id: req.user.reseller_id };
    }

    const count = await Customer.countDocuments(query);

    let customers;
    if (req.body.q) {
      customers = await Customer.find(query);
    } else {
      customers = await Customer.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    successResponse(res, {
      statusCode: 200,
      payload: { customers, count },
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { customerName, mobile, email, address, city, country } = req.body;
    await Customer.findOneAndUpdate(
      {
        reseller_id: req.user.reseller_id,
        customer_id: req.body.customer_id,
      },
      {
        $set: {
          customer_id: req.body.customer_id,
          reseller_id: req.user.reseller_id,
          customer_name: customerName,
          mobile: mobile,
          email: email,
          delivery_address: {
            address: address,
            city: city,
            country: country,
          },
        },
      },
      { new: true }
    );
    successResponse(res, {
      message: "successfully edited!",
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchQuery = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      matchQuery = {
        $or: [
          { order_id: searchRegex },
          { "customer_info.name": searchRegex },
          { "customer_info.email": searchRegex },
          { "customer_info.mobile": searchRegex },
          { status: searchRegex },
        ],
      };
    }

    const pipeline = [
      { $match: { reseller_id: req.user.reseller_id } },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          customer_info: {
            name: "$customer_info.customer_name",
            email: "$customer_info.email",
            mobile: "$customer_info.mobile",
          },
          total_ordered_product: { $size: "$ordered_products" },
          status: 1,
          createdAt: 1,
        },
      },
      { $match: matchQuery },
    ];

    const count = (await Order.aggregate(pipeline)).length;
    let orders;
    if (req.query.q) {
      orders = await Order.aggregate(pipeline);
    } else {
      orders = await Order.aggregate(pipeline)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    successResponse(res, { payload: { orders, count } });
  } catch (error) {
    next(error);
  }
};


const getResellerStatics = async (req, res, next) => {
  try {
    // Calculate start and end dates for the last 30 days
    const endDate = new Date(); // Current date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30); // Subtract 30 days

    const pipeline = [
      {
        $match: {
          reseller_id: req.user.reseller_id,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $facet: {
          order: [
            {
              $count: "count",
            },
          ],
          completedOrder: [
            {
              $match: {
                status: "completed",
              },
            },
            { $count: "count" },
          ],
          pendingOrder: [
            {
              $match: {
                status: "pending",
              },
            },
            { $count: "count" },
          ],
          canceledOrder: [
            {
              $match: {
                status: "canceled",
              },
            },
            { $count: "count" },
          ],
          profit: [
            {
              $match: {
                status: "completed",
              },
            },
            {
              $unwind: "$ordered_products",
            },
            {
              $group: {
                _id: null,
                totalProfit: { $sum: "$ordered_products.profit" },
              },
            },
          ],
        },
      },
    ];

    const customerPipeline = [
      {
        $match: {
          reseller_id: req.user.reseller_id,
          createdAt: { $gte: startDate, $lte: endDate }, // Filter by date range
        },
      },
      { $count: "count" },
    ];

    const orderStatisticsArray = await Order.aggregate(pipeline);
    const customerArray = await Customer.aggregate(customerPipeline);

    // last 30 days statistics
    const statistics = {
      totalOrder: orderStatisticsArray[0].order[0].count,
      completedOrder: orderStatisticsArray[0].completedOrder[0].count,
      pendingOrder: orderStatisticsArray[0].pendingOrder[0].count,
      canceledOrder: orderStatisticsArray[0].canceledOrder[0].count,
      totalProfit: orderStatisticsArray[0].profit[0].totalProfit,
      totalCustomer: customerArray[0].count,
    };

    successResponse(res, {
      payload: { statistics },
    });
  } catch (error) {
    next(error);
  }
};

const getResentEarning = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
      {
        $match: { reseller_id: req.user.reseller_id, status: "completed" },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          name: "$customer_info.customer_name",
          completed_date: 1,
          total: {
            $sum: {
              $map: {
                input: "$ordered_products",
                as: "product",
                in: {
                  $multiply: ["$$product.quantity", "$$product.unit_price"],
                },
              },
            },
          },
          total_ordered_product: { $size: "$ordered_products" },
        },
      },
    ];

    const count = (await Order.aggregate(pipeline)).length;

    const resentEarning = await Order.aggregate(pipeline)
      .sort({ completed_date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    successResponse(res, { payload: { resentEarning, count } });
  } catch (error) {
    next(error);
  }
};

const getProfitStatics = async (req, res, next) => {
  try {
    // Calculate start and end dates for the last 30 days
    const endDate = new Date(); // Current date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30); // Subtract 30 days

    const pipeline = [
      {
        $match: {
          reseller_id: req.user.reseller_id,
          status: "completed",
          updatedAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $unwind: "$ordered_products",
      },
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$ordered_products.profit" },
        },
      },
    ];

    const orderStatisticsArray = await Order.aggregate(pipeline);
    const lastThirtyDaysProfit = orderStatisticsArray[0];

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const thisMonthPipeline = [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$reseller_id", req.user.reseller_id] },
              { $eq: ["$status", "completed"] },
              { $eq: [{ $month: "$updatedAt" }, currentMonth] },
              { $eq: [{ $year: "$updatedAt" }, currentYear] },
            ],
          },
        },
      },
      {
        $unwind: "$ordered_products",
      },
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$ordered_products.profit" },
        },
      },
    ];

    const thisMonthProfitArray = await Order.aggregate(thisMonthPipeline);
    const thisMonthProfit = thisMonthProfitArray[0];

    successResponse(res, {
      payload: { lastThirtyDaysProfit, thisMonthProfit },
    });
  } catch (error) {
    next(error);
  }
};

const getProfitOverview = async (req, res, next) => {
  try {
    const dateParts = req.query.date.split("-");
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[0]);

    const pipeline = [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$reseller_id", req.user.reseller_id] },
              { $eq: ["$status", "completed"] },
              { $eq: [{ $month: "$updatedAt" }, month] },
              { $eq: [{ $year: "$updatedAt" }, year] },
            ],
          },
        },
      },
      {
        $facet: {
          profitEverySingleDay: [
            {
              $group: {
                _id: "$_id",
                date: { $first: { $dayOfMonth: "$updatedAt" } },
                totalProfit: { $first: { $sum: "$ordered_products.profit" } },
              },
            },
          ],
          totalProfitThisMonth: [
            {
              $unwind: "$ordered_products",
            },
            {
              $group: {
                _id: null,
                totalProfit: { $sum: "$ordered_products.profit" },
              },
            },
          ],
        },
      },
    ];

    const thisMonthProfitArray = await Order.aggregate(pipeline);
    const selectedMonthProfit = thisMonthProfitArray[0];

    successResponse(res, {
      payload: { selectedMonthProfit },
    });
  } catch (error) {
    next(error);
  }
};

const getProfit = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchQuery = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      matchQuery = {
        $or: [
          { order_id: searchRegex },
          { name: searchRegex },
          { status: searchRegex },
          { completed_date: searchRegex },
          { purchased: searchRegex },
          { total_ordered_product: searchRegex },
        ],
      };
    }

    const pipeline = [
      { $match: { reseller_id: req.user.reseller_id, status: "completed" } },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          name: "$customer_info.customer_name",
          purchased: {
            $toString: {
              $sum: {
                $map: {
                  input: "$ordered_products",
                  as: "product",
                  in: {
                    $multiply: ["$$product.quantity", "$$product.unit_price"],
                  },
                },
              },
            },
          },
          total_ordered_product: { $toString: { $size: "$ordered_products" } },
          status: 1,
          completed_date: 1,
          createdAt: 1,
        },
      },
      { $match: matchQuery },
    ];

    const count = (await Order.aggregate(pipeline)).length;
    let profit;
    if (req.query.q) {
      profit = await Order.aggregate(pipeline);
    } else {
      profit = await Order.aggregate(pipeline)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    successResponse(res, { payload: { profit, count } });
  } catch (error) {
    next(error);
  }
};

const getWithdrawData = async (req, res, next) => {
  try {
    const withdraw = await Withdraw.find({
      reseller_id: req.user?.reseller_id,
    }).sort({ date: -1 });
    successResponse(res, { payload: { withdraw } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  getMyOrders,
  getResellerStatics,
  getResentEarning,
  getProfitStatics,
  getProfitOverview,
  getProfit,
  getWithdrawData,
};
