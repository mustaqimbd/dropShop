import { useState } from "react";
import axios from "axios";
import useCart from "./useCart";
import useAuthProvider from "./useAuthProvider";

const useCartPostRequest = () => {
  const { user } = useAuthProvider();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useCart("cart", "cart/get-cart");
  const handleAddToCart = async (data) => {
    setIsLoading(true);
    data.customerId =
      JSON.parse(sessionStorage.getItem("Customer"))?.id || user?._id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        data,
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.data) {
        refetch();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleAddToCart };
};

export default useCartPostRequest;
