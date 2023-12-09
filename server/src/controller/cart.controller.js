const Cart = require("../model/cart.model");
const Products = require("../model/products.model");
const { successResponse, errorResponse } = require("./responseHandler");

const addToCart = async (req, res, next) => {
  try {
    const { customerId, productId, sellingPrice, extraProfit, quantity } =
      req.body;
    delete req.body?.customerId;
    const sessionId = req.session.id;

    const product = await Products.findOne({ _id: productId });
    if (!product) {
      return errorResponse(res, 404, "Product not found!");
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      const result = await Cart.create({
        sessionId,
        customerId,
        items: [req.body],
      });
      return successResponse(res, {
        message: "Total added products",
        payload: { totalQuantity: result.items[0].quantity },
      });
    }

    const existingItem = cart.items?.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      cart.items.push(req.body);
    } else {
      cart.items?.map((item) => {
        if (item.productId.toString() === productId) {
          item.quantity =
            quantity > 1 ? item.quantity + quantity : item.quantity + 1;

          item.sellingPrice =
            sellingPrice != item.sellingPrice
              ? sellingPrice
              : item.sellingPrice;

          item.extraProfit =
            extraProfit != item.extraProfit ? extraProfit : item.extraProfit;
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
const getFromCart = async (req, res) => {
  const sessionId = req.session.id;

  const cart = await Cart.findOne({ sessionId }).populate([
    "customerId",
    "items.productId",
  ]);
  const totalQuantity = cart?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subTotal = cart?.items.reduce((sum, item) => {
    const price = item.quantity * item?.productId?.reseller_price;
    return sum + price;
  }, 0);

  return successResponse(res, {
    message: "Total added products",
    payload: { totalQuantity, cart, subTotal },
  });
};

const updateToCart = async (req, res, next) => {
  try {
    const { productId, extraProfit, quantity, removeProductId } = req.body;
    const sessionId = req.session.id;

    const product = await Products.findOne({
      _id: productId || removeProductId,
    });
    if (!product) {
      return errorResponse(res, 404, "Product not found!");
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return errorResponse(res, 404, "Cart not found!");
    }
    if (removeProductId) {
      cart.items = cart.items?.filter((item) => {
        return item.productId.toString() !== removeProductId;
      });
    } else {
      cart.items?.map((item) => {
        if (item.productId.toString() === productId) {
          item.quantity = quantity || item.quantity;
          item.sellingPrice = product?.suggested_price + extraProfit;
          item.extraProfit =
            extraProfit == 0 ? 0 : extraProfit || item.extraProfit;
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
module.exports = {
  addToCart,
  getFromCart,
  updateToCart,
  resetCart,
};
