const Cart = require("../model/cart.model");
const Products = require("../model/products.model");
const { successResponse, errorResponse } = require("./responseHandler");

const addToCart = async (req, res, next) => {
  try {
    const cartData = req.body;
    const sessionId = req.session.id;
    const customerId = cartData.customerId;
    delete cartData.customerId;

    const product = await Products.findOne({ _id: cartData.productId });
    if (!product) {
      return errorResponse(res, 404, "Product not found!");
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      const result = await Cart.create({
        sessionId,
        customerId,
        items: [cartData],
      });
      return successResponse(res, {
        message: "Total added products",
        payload: { totalQuantity: result.items[0].quantity },
      });
    }

    const existingItem = cart.items?.find(
      (item) => item.productId.toString() === cartData.productId
    );

    if (!existingItem) {
      cart.items.push(cartData);
    } else {
      cart.items?.map((item) => {
        if (item.productId.toString() === cartData.productId) {
          item.quantity =
            cartData.quantity > 1
              ? item.quantity + cartData.quantity
              : item.quantity + 1;
          item.sellingPrice =
            cartData.sellingPrice != item.sellingPrice
              ? cartData.sellingPrice
              : item.sellingPrice;
        }
        return item;
      });
    }

    const result = await Cart.findOneAndUpdate(
      { sessionId: cart.sessionId },
      { $set: cart },
      { new: true }
    );

    return successResponse(res, {
      message: "Total added products",
      payload: { result },
    });
  } catch (error) {
    next(error);
  }
};

// Get products in the cart
const getCart = async (req, res) => {
  const sessionId = req.session.id;

  const cart = await Cart.findOne({ sessionId });
  const totalQuantity = cart?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return successResponse(res, {
    message: "Total added products",
    payload: { totalQuantity },
  });
};

const getCartProducts = async (req, res) => {
  const sessionId = req.session.id;

  const products = await Cart.findOne({ sessionId }).populate(
    "items.productId"
  );

  return successResponse(res, {
    message: "Cart's products",
    payload: { products: products?.items },
  });
};

const resetCart = async (req, res, next) => {
  try {
    const cartExits = await Cart.findOne({
      customerId: req.params.customerId,
      sessionId: req.session?.id,
    });

    if (!cartExits) {
      await Cart.deleteOne({ sessionId: req.session?.id });
    }

    successResponse(res, { message: "Cart reset successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { addToCart, getCart, getCartProducts, resetCart };
