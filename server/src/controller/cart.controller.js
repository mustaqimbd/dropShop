const uuid = require("uuid");

// API endpoint to handle adding items to the guest cart
const addToCart = (req, res, next) => {
  try {
    const guestCarts = {};
    const { productId, quantity } = req.body;
    // Get the session ID from the request (or generate a new one if it doesn't exist)
    const sessionId = req.headers["x-session-id"] || uuid.v4();
    // Check if there's an existing guest cart for this session
    const guestCart = guestCarts[sessionId] || [];
    // Update the guest cart
    const updatedCart = [...guestCart, { productId, quantity }];

    // Store the updated cart in memory
    guestCarts[sessionId] = updatedCart;
    // Respond with the updated cart data (you might want to send back only what the client needs)
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart };
