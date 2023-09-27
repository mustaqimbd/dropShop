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
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "user_id",
          as: "sellerInfo",
        },
      },
      {
        $unwind: "$sellerInfo",
      },
      {
        $project: {
          _id: 0,
          status: 1,
          productName: "$productInfo.product_name",
          productImage: "$productInfo.images.link",
          customerName: "$customer.customerName",
          shipping: "$customer.address",
          sellerName: "$sellerInfo.name",
          sellerShopName: "$sellerInfo.shop_info.shop_name",
          sellerShopLogo: "$sellerInfo.shop_info.logo",
        },
      },
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

module.exports = { trackOrder };
