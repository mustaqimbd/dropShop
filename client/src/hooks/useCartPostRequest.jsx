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
          title: "Please, Select a customer from reseller panel!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      data.customerId = customerId;
      const response = await axiosSecure.post(
        "/cart",
        data
      );

      if (response.data) {
        refetch();
        // Show success message using SweetAlert2
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add to cart!",
        text: error?.response?.data?.message || "Something went wrong.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleAddToCart };
};

export default useCartPostRequest;
