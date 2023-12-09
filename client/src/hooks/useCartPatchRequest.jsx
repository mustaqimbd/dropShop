import { useState } from "react";
import axios from "axios";
import useCart from "./useCart";

const useCartPatchRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useCart("cart", "cart/get-cart");
  const handleUpdateToCart = async (data) => {
    setIsLoading(true);
  
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/cart/update-cart",
        data,
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.data) {
        refetch();
      }
    } catch (error) {
      console.error("Error Updating to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleUpdateToCart };
};

export default useCartPatchRequest;
