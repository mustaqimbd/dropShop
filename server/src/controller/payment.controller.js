const SSLCommerzPayment = require("sslcommerz-lts");
const { store_id, store_passwd } = require("../secret");
const Cart = require("../model/cart.model");
const generateTransactionId = require("../utilities/generateTransactionId");
const OrderModel = require("../model/order.model");
const { successResponse } = require("./responseHandler");
const is_live = false; //true for live, false for sandbox

const orderPayment = async (req, res, next) => {
  try {
    const trxID = generateTransactionId();
    const result = await Cart.findOne({ sessionId: req.session?.id });
    if (!result) {
      throw new Error("Cart not found!");
    }
    // console.log(sessionId, result);
    // eslint-disable-next-line no-unused-vars
    const order = {
      reseller: req.user?._id,
      customer: result.customerId,
      ordered_products: result.items,
      trxID: trxID,
    };

    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: trxID, // use unique tran_id for each api call
      success_url: "http://localhost:5000/api/payments/order/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });
    });
  } catch (error) {
    next(error);
  }
};
const orderPaymentSuccess = async (req, res, next) => {
  try {

    const trxID = generateTransactionId();
    const result = await Cart.findOne({ sessionId: req.session?.id });
    if (!result) {
      throw new Error("Cart not found!");
    }
    // console.log(sessionId, result);
    console.log("result", req.body)

    // const order = {
    //   reseller: req.user?._id,
    //   customer: result.customerId,
    //   reseller_id: req.user.reseller_id,
    //   customer_id: req.user.customer_id,
    //   ordered_products: result.items,
    //   trxID: trxID,
    // };
    const order = {
      reseller: req.user?._id,
      customer: result.customerId,
      reseller_id: "RS8844KH",
      customer_id: "customer1",
      ordered_products: result.items,
      trxID: trxID,
    };

    await OrderModel.create(order);

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

const dropShipperFeePayment = (req, res, next) => {
  try {
    console.log(req.user._id);
    const sessionId = req.headers.sessionId;
    const trxID = "REF123";
    console.log(sessionId);
    const order = {};
    const data = {
      total_amount: 100,
      currency: order?.currency,
      tran_id: trxID, // use unique tran_id for each api call
      success_url: "http://localhost:3030/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { orderPayment, dropShipperFeePayment, orderPaymentSuccess };
