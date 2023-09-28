const OrdersAggregationPipeline = require("../helper/OrdersAggregationPipeline");
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
      ...OrdersAggregationPipeline(),
      {
        $limit: 1,
      },
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
    const { skip: currentPage } = req.query;
    const limit = 20;
    const pipeline = [
      ...OrdersAggregationPipeline(),
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: currentPage * limit,
      },
      {
        $limit: limit,
      },
    ];
    const orders = await Order.aggregate(pipeline);
    return successResponse(res, {
      message: "Total orders.",
      payload: {
        skip: currentPage * limit,
        limit: limit,
        length: orders.length,
        orders,
      },
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
