import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";

const AddToCartSection = ({
  id,
  quantity,
  sellingPrice,
  extraProfit,
}) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(parseInt(count || 0) + 1);
  };
  const handleDecrement = () => {
    setCount(parseInt(count) - 1);
  };
  const handleInput = (v) => {
    setCount(v);
  };

  return (
    <div className="flex gap-10">
      <div className="flex justify-center items-center gap-5 ">
        <button
          onClick={handleDecrement}
          disabled={count == 1 ? true : false}
          className="text-2xl hover:bg-[#85B643] px-3"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          max={9999}
          value={quantity || count || ""}
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
          onClick={handleIncrement}
          className="text-2xl hover:bg-[#85B643] px-3"
        >
          +
        </button>
      </div>
      <AddToCartBtn
        data={{
          productId: id,
          sellingPrice: sellingPrice,
          extraProfit: extraProfit,
          quantity: count || 1,
        }}
      />
    </div>
  );
};

export default AddToCartSection;
