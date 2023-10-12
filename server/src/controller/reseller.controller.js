const { successResponse, errorResponse } = require("./responseHandler");
const Customer = require("../model/customers.model");
const Order = require("../model/order.model");
const generateUniqueId = require("generate-unique-id");

const addCustomer = async (req, res, next) => {
  console.log(req.body);
  try {
    const customerId = generateUniqueId({
      length: 8,
    }).toUpperCase();
    const customer = await Customer.findOne({
      $and: [{ reseller_id: req.body.reseller_id }],
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    if (customer) {
      return errorResponse(res, 200, "This customer already exists.");
    } else {
      const customerInfo = new Customer({
        customer_id: customerId,
        ...req.body,
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
    const totalQuantity = await Customer.countDocuments({
      reseller_id: req.query.reseller_id,
    });
    const customers = await Customer.find({
      reseller_id: req.query.reseller_id,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    successResponse(res, {
      statusCode: 200,
      payload: { customers, totalQuantity },
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    await Customer.findOneAndUpdate(
      {
        reseller_id: req.body.reseller_id,
        customer_id: req.body.customer_id,
      },
      {
        $set: { ...req.body },
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

const searchCustomer = async (req, res, next) => {
  const searchQuery = req.query.q;
  console.log(req.params.reseller_id, searchQuery, 70);
  try {
    const customers = await Customer.find({
      $and: [{ reseller_id: req.params.reseller_id }],
      $or: [
        { customer_name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { mobile: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  console.log(req.query.reseller_id);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalQuantity = await Order.countDocuments({
      reseller_id: req.query.reseller_id,
    });
    console.log(totalQuantity, "101");
    const pipeline = [
      { $match: { reseller_id: req.query.reseller_id } },
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
    ];

    const myOrders = await Order.aggregate(pipeline)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    successResponse(res, { payload: { myOrders, totalQuantity } });
  } catch (error) {
    next(error);
  }
};

// const searchOrd = async (req, res, next) => {
//   console.log(req.params.reseller_id);
//   try {
//     const page = parseInt(req.params.page) || 1;
//     const limit = parseInt(req.params.limit) || 10;

//     let matchQuery = { reseller_id: req.params.reseller_id };

//     // Add search filters if provided in the request
//     if (req.query.q) {
//       const searchRegex = new RegExp(req.query.search, "i");
//       console.log(searchRegex, "153");
//       // matchQuery = {
//       //   $and: [
//       //     { reseller_id: req.params.reseller_id },],

//       //       $or: [
//       //         { order_id: searchRegex },
//       //         { 'customer_info.name': { $regex: searchRegex, $options: "i" }  },
//       //         { 'customer_info.email': { $regex: searchRegex, $options: "i" }},
//       //         { 'customer_info.mobile': { $regex: searchRegex, $options: "i" } },
//       //       ]
//       // };

//       matchQuery = {
//         $and: [
//           { reseller_id: req.params.reseller_id },
//           {
//             $or: [
//               { order_id: searchRegex },
//               { "customer_info.name": searchRegex },
//               { "customer_info.email": searchRegex },
//               { "customer_info.mobile": searchRegex },
//             ],
//           },
//         ],
//       };
//     }
//     console.log(matchQuery, "167");

//     const totalQuantity = await Order.countDocuments(matchQuery);

//     const pipeline = [
//       { $match: matchQuery },
//       {
//         $lookup: {
//           from: "customers",
//           localField: "customer_id",
//           foreignField: "customer_id",
//           as: "customer_info",
//         },
//       },
//       {
//         $unwind: "$customer_info",
//       },
//       {
//         $project: {
//           _id: 0,
//           order_id: 1,
//           customer_info: {
//             name: "$customer_info.customer_name",
//             email: "$customer_info.email",
//             mobile: "$customer_info.mobile",
//           },
//           total_ordered_product: { $size: "$ordered_products" },
//           status: 1,
//           createdAt: 1,
//         },
//       },
//     ];

//     const myOrders = await Order.aggregate(pipeline)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     successResponse(res, { payload: { myOrders, totalQuantity, matchQuery } });
//   } catch (error) {
//     next(error);
//   }
// };

// TODO
const searchOrder = async (req, res, next) => {
  try {
    const { customer_name, email, mobile, status } = req.query;
    console.log(email,'227')
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
      { $match: { reseller_id: req.params.reseller_id } },
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
    ];

    if (customer_name) {
      pipeline[0].$match.customer_info = { name: customer_name };
    }
    if (email) {
      pipeline[0].$match.customer_info = { email };
    }
    if (mobile) {
      pipeline[0].$match.customer_info = { mobile };
    }
    if (status) {
      pipeline[0].$match.status = status;
    }
console.log(pipeline,'272')
    const myOrders = await Order.aggregate(pipeline)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    successResponse(res, { payload: { myOrders} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  searchCustomer,
  getMyOrders,
  searchOrder,
};
