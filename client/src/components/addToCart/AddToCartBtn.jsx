import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useState } from "react";
import axios from "axios";
import useCart from "../../hooks/useCart";
import useAuthProvider from "../../hooks/useAuthProvider";

function AddToCartBtn({ data }) {
  const { user } = useAuthProvider();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useCart("cart", "cart/get-cart");
  const handleAddToCart = async () => {
    setIsLoading(true);
    data.customerId =
      JSON.parse(sessionStorage.getItem("Customer"))?.customerId ||
      user.reseller_id;

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

  return (
    <button
      disabled={isLoading}
      onClick={handleAddToCart}
      className="bg-[#85B643] w-[220px] px-3 flex justify-center items-center gap-2 text-white py-2"
    >
      <ShoppingBasketIcon fontSize="small" />{" "}
      <span>{isLoading ? "Adding to Cart..." : "Add to Cart"}</span>
    </button>
  );
}

export default AddToCartBtn;
