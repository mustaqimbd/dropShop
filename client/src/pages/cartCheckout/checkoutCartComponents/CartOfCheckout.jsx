import { Link } from "react-router-dom";
import ExtraProfit from "./ExtraProfit";
import Quantity from "./Quantity";
import DeleteIcon from "@mui/icons-material/Delete";
import useCartPatchRequest from "../../../hooks/useCartPatchRequest";

const CartOfCheckout = ({ product }) => {
  const { product_name, reseller_price, category_slug, product_slug } =
    product.productId;

  const { handleUpdateToCart, isLoading } = useCartPatchRequest();

  const handleDelete = (p) => {
    handleUpdateToCart({ removeProductId: p.productId._id });
  };

  function formatNumber(number) {
    let roundedNumber = Math.round(number * 100) / 100;
    let isWholeNumber = roundedNumber % 1 === 0;
    let formattedNumber = isWholeNumber
      ? roundedNumber.toString()
      : roundedNumber.toFixed(2);

    return formattedNumber;
  }

  return (
    <div
      key={product._id}
      className="flex gap-5 border rounded-md shadow-slate-50"
    >
      <Link
        to={`/product-category/${category_slug}/${product_slug}`}
        target="_blank"
      >
        <div className="w-[200px] h-[200px]">
          <img
            src={product?.productId?.images[0]?.link}
            alt=""
            className="w-full h-full"
          />
        </div>
      </Link>

      <div className="flex-1 py-3 px-5 relative">
        <h1 className="text-xl font-semibold mb-1">
          <Link
            to={`/product-category/${category_slug}/${product_slug}`}
            target="_blank"
          >
            {product_name.length > 120
              ? product_name.substr(0, 120) + " ..."
              : product_name}{" "}
          </Link>
        </h1>
        <p className="text-lg font-medium">
          Selling price :{" "}
          <span className="font-bold">
            {formatNumber(product.sellingPrice)}৳
          </span>
        </p>
        <div className="flex gap-10 items-center">
          <p className="text-lg font-medium">
            Reseller rice : <span className="font-bold">{reseller_price}৳</span>
          </p>
          <ExtraProfit product={product} />
        </div>
        <Quantity product={product} />

        <button
          disabled={isLoading}
          onClick={() => handleDelete(product)}
          title="Delete"
          className="absolute bottom-3 right-4"
        >
          <DeleteIcon className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default CartOfCheckout;
