import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import useCartPostRequest from "../../hooks/useCartPostRequest";

function AddToCartBtn({ data }) {
  const { isLoading, handleAddToCart } = useCartPostRequest();

  return (
    <button
      disabled={isLoading}
      onClick={() => handleAddToCart(data)}
      className="bg-[#85B643] w-[220px] px-3 flex justify-center items-center gap-2 text-white py-2"
    >
      <ShoppingBasketIcon fontSize="small" />{" "}
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCartBtn;
