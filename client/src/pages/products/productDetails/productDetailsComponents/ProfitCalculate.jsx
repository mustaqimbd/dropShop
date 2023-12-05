import { useState } from "react";
import AddToCart from "../../../../components/addToCart/AddToCart";

const ProfitCalculate = ({ id, suggested_price, reseller_price }) => {
  const [extraProfit, setExtraProfit] = useState(0);

  const profit = (suggested_price - reseller_price).toFixed();
  const totalProfit = parseInt(profit) + extraProfit;
  const totalPrice = suggested_price + totalProfit;

  return (
    <>
      {" "}
      <div className="space-y-4">
        <div className="space-y-1 flex flex-col">
          <label htmlFor="profit">Extra profit amount of suggested price</label>
          <div className="flex items-center gap-5">
            <input
              type="number"
              min={0}
              onChange={(e) => setExtraProfit(Math.max(0, e.target.value))}
              className="border border-gray-400 outline-gray-500 w-[200px] h-[30px] rounded"
              id="profit"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-[600] ">
            <span className="text-[#5F6C72]">Profit would be : </span>
            <span>{totalProfit}৳</span>
          </p>
          <p className="text-lg font-[600] ">
            <span className="text-[#5F6C72]">You would sell : </span>
            <span>{totalPrice}৳</span>
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <AddToCart
          id={id}
          resellerPrice={reseller_price}
          sellingPrice={totalPrice}
        />
      </div>
    </>
  );
};

export default ProfitCalculate;
