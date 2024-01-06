import { useState } from "react";
import useCart from "./useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useCartPostRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useCart("cart", "cart/get-cart");
  const [axiosSecure] = useAxiosSecure();
  const handleAddToCart = async (data) => {
    try {
      setIsLoading(true);
      const customerId = JSON.parse(sessionStorage.getItem("Customer"))?.id;

      if (!customerId) {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please,Select a customer!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      data.customerId = customerId;
      const response = await axiosSecure.post(
        "/api/cart",
        data
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
