import React, { useState } from "react";
import axios from "axios";

function AddToCart({ data }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      console.log(data)
      // Simulate a request to the server using Axios
      const response = await axios.post("http://localhost:5000/api/cart", data);

      // Assuming the server responds with the updated guest cart data
      console.log("Updated Guest Cart Data:", response.data);

      // Update the UI or navigate to the cart page, etc.
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleAddToCart}
      className="bg-[#85B643] w-[220px] px-3 flex justify-center items-center gap-3 text-white py-2"
    >
      {/* <ShoppingBasketIcon fontSize="small" />{" "} */}
      <span>{isLoading ? "Adding to Cart..." : "Add to Cart"}</span>
    </button>
  );
}

export default AddToCart;
