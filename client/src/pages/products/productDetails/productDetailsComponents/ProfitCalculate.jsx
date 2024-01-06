import { useState } from "react";
import AddToCartSection from "../../../../components/addToCart/AddToCartSection";

const ProfitCalculate = ({ id, suggested_price, reseller_price }) => {
  const [extraProfit, setExtraProfit] = useState(0);

  const profit = suggested_price - reseller_price;
  const totalProfit = profit + extraProfit;
  const totalPrice = reseller_price + totalProfit;

  function formatNumber(number) {
    let roundedNumber = Math.round(number * 100) / 100;
    let isWholeNumber = roundedNumber % 1 === 0;
    let formattedNumber = isWholeNumber
      ? roundedNumber.toString()
      : roundedNumber.toFixed(2);

    return formattedNumber;
  }

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
            <span>{formatNumber(totalProfit)}৳</span>
          </p>
          <p className="text-lg font-[600] ">
            <span className="text-[#5F6C72]">You would sell : </span>
            <span>{formatNumber(totalPrice)}৳</span>
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <AddToCartSection
          extraProfit={extraProfit}
          id={id}
          resellerPrice={reseller_price}
          sellingPrice={totalPrice}
        />
      </div>
    </>
  );
};

export default ProfitCalculate;
