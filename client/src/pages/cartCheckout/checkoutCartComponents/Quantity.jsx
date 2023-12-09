import { useState } from "react";
import useCartPatchRequest from "../../../hooks/useCartPatchRequest";

const Quantity = ({ product }) => {
  const [count, setCount] = useState(product.quantity || 1);

  const handleInput = (v) => {
    setCount(v);
  };

  const { handleUpdateToCart } = useCartPatchRequest();
  const isDisable = product.quantity === count ? true : false;

  const handleUpdate = () => {
    if (isNaN(count)) {
      setCount(1);
    }
    const data = {
      productId: product?.productId?._id,
      quantity: count || 1,
      extraProfit: product.extraProfit,
    };
    handleUpdateToCart(data);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <span className="text-sm">Quantity :</span>
        <input
          type="number"
          min={1}
          max={9999}
          value={count || ""}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            const maxValue = 9999;
            if (!isNaN(value) && value > maxValue) {
              handleInput(maxValue);
            } else {
              handleInput(Math.max(1, value));
            }
          }}
          className="border outline-none w-[40px] h-[25px] [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={handleUpdate}
          disabled={isDisable}
          className={`bg-[#85B643] text-white text-sm px-2 py-[2px] rounded ${
            isDisable && "hidden"
          }`}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Quantity;
