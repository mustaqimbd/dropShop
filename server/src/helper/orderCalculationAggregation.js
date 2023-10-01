const orderCalculationAggregation = () => [
  {
    $unwind: "$ordered_products",
  },
  {
    $lookup: {
      from: "products",
      localField: "ordered_products.product_slug",
      foreignField: "product_slug",
      as: "product_info",
    },
  },
  {
    $unwind: "$product_info",
  },
  {
    $addFields: {
      "ordered_products.subtotal": {
        $multiply: [
          "$ordered_products.quantity",
          "$ordered_products.unit_price",
        ],
      },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "seller_id",
      foreignField: "user_id",
      as: "seller_info",
    },
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
    $group: {
      _id: "$order_id",
      order_info: { $first: "$$ROOT" },
      products: {
        $push: {
          product_name: "$product_info.product_name",
          product_image_url: "$product_info.product_image_url",
          quantity: "$ordered_products.quantity",
          unit_price: "$ordered_products.unit_price",
          subtotal: "$ordered_products.subtotal",
        },
      },
      seller_info: { $first: "$seller_info" },
      customer_info: { $first: "$customer_info" },
      createdDate: { $first: "$createdAt" },
    },
  },
  {
    $addFields: {
      "order_info.subtotal": {
        $sum: "$products.subtotal",
      },
    },
  },
  {
    $project: {
      _id: 0,
      order_id: "$_id",
      order_status: "$order_info.status",
      delivery_charge: "$order_info.delivery_charge",
      subtotal: "$order_info.subtotal",
      products: 1,
      createdAt: "$createdDate",
      seller_info: {
        name: { $arrayElemAt: ["$seller_info.name", 0] },
        email: { $arrayElemAt: ["$seller_info.email", 0] },
        profile_pic: { $arrayElemAt: ["$seller_info.profile_pic", 0] },
      },
      customer_info: {
        name: { $arrayElemAt: ["$customer_info.customer_name", 0] },
        mobile: { $arrayElemAt: ["$customer_info.mobile", 0] },
        address: { $arrayElemAt: ["$customer_info.address", 0] },
      },
    },
  },
];
module.exports = orderCalculationAggregation;
