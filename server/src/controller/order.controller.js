const { default: mongoose } = require("mongoose");
const orderCalculationAggregation = require("../helper/orderCalculationAggregation");
const Cart = require("../model/cart.model");
const OrderModel = require("../model/order.model");
const Order = require("../model/order.model");
const generateTransactionId = require("../utilities/generateTransactionId");
const { successResponse } = require("./responseHandler");
const generateUniqueId = require("generate-unique-id");

const createOrder = async (req, res, next) => {
  try {
    const trxID = generateTransactionId();
    const result = await Cart.findOne({ sessionId: req.session?.id });
    if (!result) {
      throw new Error("Cart not found!");
    }

    const order_id = generateUniqueId({
      length: 8,
    }).toUpperCase()

    const order = {
      order_id:`OID-${order_id}`,
      reseller: req.user?._id,
      customer: result.customerId,
      reseller_id: req.user.reseller_id,
      customer_id: req.user.customer_id,
      ordered_products: result.items,
      ...req.body,
      trxID: trxID,
    };

    const response = await OrderModel.create(order);
    if (response) {
      await Cart.deleteOne({ sessionId: req.session?.id })
    }
    // const successUrl = "http://localhost:5173/payment-success";
    // // Redirect the user to the success URL
    // res.redirect(successUrl);
    return successResponse(res, {
      statusCode: 200,
      message: "Order created successfully!"
    });

  } catch (error) {
    console.log(error)
    // Forward the error to the error-handling middleware
    next(error);
  }
};

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

// const getOrderInfo = async (req, res, next) => {
//   try {
//     const { page = 0, status = "all" } = req.query;
//     const limit = 20;
//     const skip = page * limit;
//     const pipeline = [
//       {
//         $facet: {
//           totalOrders: [
//             {
//               $count: "total",
//             },
//           ],
//           orders: [
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "reseller",
//                 foreignField: "_id",
//                 as: "user_info",
//               },
//             },
//             {
//               $unwind: "$user_info",
//             },
//             {
//               $lookup: {
//                 from: "customers",
//                 localField: "customer",
//                 foreignField: "_id",
//                 as: "customer_info",
//               },
//             },
//             {
//               $unwind: "$customer_info",
//             },
//             {
//               $project: {
//                 _id: 0,
//                 order_id: 1,
//                 seller_info: {
//                   name: "$user_info.name",
//                   email: "$user_info.email",
//                 },
//                 customer_info: {
//                   name: "$customer_info.customer_name",
//                   mobile: "$customer_info.mobile",
//                 },
//                 total_ordered_product: { $size: "$ordered_products" },
//                 status: 1,
//                 createdAt: 1,
//               },
//             },
//             {
//               $skip: parseInt(skip),
//             },
//             {
//               $limit: limit,
//             },
//           ],
//         },
//       },
//     ];
//     if (status && status !== "all") {
//       pipeline[0].$facet.orders.push({
//         $match: {
//           status: status,
//         },
//       });
//     }
//     const orders = await Order.aggregate(pipeline);
//     if (!orders[0]) {
//       return successResponse(res, {
//         message: "No orders found.",
//         payload: {
//           skip,
//           limit,
//           length: 0,
//           total: 0,
//           orders: [],
//         },
//       });
//     }
//     if (orders[0].totalOrders.length === 0) {
//       return successResponse(res, {
//         message: "Total orders.",
//         payload: {
//           skip,
//           limit,
//           length: orders[0].orders.length,
//           total: orders[0]?.totalOrders[0]?.total,
//           orders: orders[0].orders,
//         },
//       })
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const getOrderInfo = async (req, res, next) => {
  try {
    const resellerId = req.user?._id;
    const { status = "all" } = req.query;
    const page = 0
    const limit = 20
    const skip = page * limit;

    if (!resellerId) {
      return res.status(400).json({
        message: "Reseller ID is required to fetch specific orders.",
      });
    }

    const pipeline = [
      {
        $match: {
          reseller: mongoose.Types.ObjectId(resellerId),
          ...(status !== "all" && { status }),
        },
      },
      {
        $facet: {
          totalOrders: [
            {
              $count: "total",
            },
          ],
          orders: [
            {
              $lookup: {
                from: "users",
                localField: "reseller",
                foreignField: "_id",
                as: "user_info",
              },
            },
            {
              $unwind: "$user_info",
            },
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
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
                  email: "$user_info.email",
                },
                customer_info: {
                  name: "$customer_info.customer_name",
                  mobile: "$customer_info.mobile",
                },
                total_ordered_product: { $size: "$ordered_products" },
                status: 1,
                createdAt: 1,
              },
            },
            {
              $skip: parseInt(skip),
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);
    
    if (!orders.length || !orders[0].orders.length) {
      return res.status(404).json({
        message: "No orders found.",
        payload: {
          skip,
          limit,
          length: 0,
          total: 0,
          orders: [],
        },
      });
    }

    return res.status(200).json({
      message: "Orders fetched successfully.",
      payload: {
        skip,
        limit,
        length: orders[0].orders.length,
        total: orders[0]?.totalOrders[0]?.total || 0,
        orders: orders[0].orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.query;
    if (status === "completed") {
      await Order.findOneAndUpdate(
        { order_id: orderId },
        { $set: { status, completed_date: Date.now() } },
        { runValidators: true }
      );
    } else {
      await Order.findOneAndUpdate(
        { order_id: orderId },
        { $set: { status } },
        { runValidators: true }
      );
    }
    return successResponse(res, {
      message: "Updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, trackOrder, getOrderInfo, updateOrderStatus };
