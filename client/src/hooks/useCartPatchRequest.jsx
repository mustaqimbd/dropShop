import { useState } from "react";
import useCart from "./useCart";
import useAxiosSecure from "./useAxiosSecure";

const useCartPatchRequest = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useCart("cart", "cart/get-cart");
  const handleUpdateToCart = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosSecure.patch("/cart/update-cart", data);

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
