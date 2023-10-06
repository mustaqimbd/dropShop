const { successResponse, errorResponse } = require("./responseHandler");
const Customer = require("../model/customers.model");
const generateUniqueId = require("generate-unique-id");

const addCustomer = async (req, res, next) => {
  try {
    const customerId = generateUniqueId({
      length: 8,
    }).toUpperCase();
    const customer = await Customer.findOne({
      $and: [{ resellerId: req.body.resellerId }],
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    if (customer) {
      return errorResponse(res, 200, "This customer already exists.");
    } else {
      const customerInfo = new Customer({ customerId, ...req.body });
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
      resellerId: req.query.resellerId,
    });
    const customers = await Customer.find({ resellerId: req.query.resellerId })
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
        resellerId: req.body.resellerId,
        customerId: req.body.customerId,
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
module.exports = { addCustomer, getCustomers, updateCustomer };
