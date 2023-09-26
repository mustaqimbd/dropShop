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
    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product_slug",
          foreignField: "product_slug",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
    ];
    const orders = await Order.aggregate(pipeline);
    console.log(orders.length);
    return successResponse(res, {
      message: "Total orders.",
      payload: { orders },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackOrder, getOrderInfo };
