import { useState } from "react";
import useCartPatchRequest from "../../../hooks/useCartPatchRequest";

const ExtraProfit = ({ product }) => {
  const [extraProfit, setExtraProfit] = useState(product.extraProfit);

  const handleProfitInput = (v) => {
    setExtraProfit(v || 0);
  };

  const { handleUpdateToCart } = useCartPatchRequest();
  const isDisable = product.extraProfit === extraProfit ? true : false;

  const handleUpdate = () => {
    const data = {
      productId: product?.productId?._id,
      extraProfit: extraProfit,
    };
    handleUpdateToCart(data);
  };

  return (
    <>
      {product.extraProfit ? (
        <div className="flex gap-2 items-center text-sm text-gray-500">
          <span>Added extra profit :</span>
          <input
            type="number"
            min={0}
            max={9999}
            value={extraProfit || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              const maxValue = 9999;
              if (!isNaN(value) && value > maxValue) {
                handleProfitInput(maxValue);
              } else {
                handleProfitInput(Math.max(0, value));
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
      ) : (
        ""
      )}
    </>
  );
};

export default ExtraProfit;
