// Import necessary modules
const crypto = require("crypto");

// Function to generate a unique payment transaction ID
function generateTransactionId() {
  // Get the current timestamp (in milliseconds)
  const timestamp = Date.now().toString();

  // Generate a random component using a cryptographically secure method
  const randomBytes = crypto.randomBytes(4).toString("hex");

  // Combine timestamp and random component to create a unique ID
  const transactionId = `${timestamp}-${randomBytes}`;

  return transactionId;
}

module.exports = generateTransactionId;
