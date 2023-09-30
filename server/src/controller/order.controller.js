const orderCalculationAggregation = require("../helper/orderCalculationAggregation");
const Order = require("../model/order.model");
const { successResponse } = require("./responseHandler");

const trackOrder = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const pipeline = [
      {
        $match: {
          order_id: orderId,
        },
      },
      ...orderCalculationAggregation(),
    ];
    const orderDetails = await Order.aggregate(pipeline);

    return successResponse(res, {
      message: "Order information.",
      payload: { orderDetails },
    });
  } catch (error) {
    next(error);
  }
};

const getOrderInfo = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "user_id",
          as: "user_info",
        },
      },
      {
        $unwind: "$user_info",
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
          seller_info: {
            name: "$user_info.name",
            profile_pic: "$user_info.profile_pic",
          },
          customer_info: {
            name: "$customer_info.customer_name",
          },
          total_ordered_product: { $size: "$ordered_products" },
          status: 1,
          createdAt: 1,
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);
    return successResponse(res, {
      message: "Total orders.",
      payload: { orders },
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.query;
    await Order.findOneAndUpdate(
      { order_id: orderId },
      { $set: { status } },
      { runValidators: true }
    );
    return successResponse(res, {
      message: "Updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackOrder, getOrderInfo, updateOrderStatus };
