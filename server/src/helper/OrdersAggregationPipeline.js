const OrdersAggregationPipeline = (projection = []) => [
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
      sellerEmail: "$sellerInfo.email",
      sellerShopName: "$sellerInfo.shop_info.shop_name",
      sellerShopLogo: "$sellerInfo.shop_info.logo",
      quantity: 1,
      createdAt: 1,
      ...projection,
    },
  },
];
module.exports = OrdersAggregationPipeline;
