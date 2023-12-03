import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useParams } from "react-router-dom";
import useGetRequest from "../../../hooks/useGetRequest";
import { useState } from "react";
import AddToCart from "../../../components/addToCart/AddToCart";

const ProductDetails = () => {
  const { productSlug } = useParams();
  const { data } = useGetRequest(
    "product-details",
    `products/details/${productSlug}`
  );

  const product = data?.payload ?? {};
  // console.log(product, data);
  const {
    product_name,
    product_id,
    reseller_price,
    suggested_price,
    is_active,
    warranty,
    description,
  } = product;
  const profit = (suggested_price - reseller_price).toFixed();

  const [count, setCount] = useState(1);
  const [wholesaleCount, setWholesaleCount] = useState(1);
  const [extraProfit, setExtraProfit] = useState(0);

  const handleIncrement = () => {
    setCount(parseInt(count) + 1);
  };
  const handleDecrement = () => {
    setCount(parseInt(count) - 1);
  };
  const handleInput = (v) => {
    setCount(v);
  };

  const handleWholesaleIncrement = () => {
    setWholesaleCount(parseInt(wholesaleCount) + 1);
  };
  const handleWholesaleDecrement = () => {
    setWholesaleCount(parseInt(wholesaleCount) - 1);
  };
  const handleWholesaleInput = (v) => {
    setWholesaleCount(v);
  };
  const totalProfit = parseInt(profit) + extraProfit;
  const totalPrice = suggested_price + totalProfit;
  const isDisable = extraProfit < 1 ? true : false;

  const addToOrder = (data) => {
    let cart = JSON.parse(localStorage.getItem("orderCart"));
    console.log(cart);
    if (cart) {
      const exist = cart.find((item) => item.productId === data.productId);
      if (exist) {
        console.log(exist);
        alert(`already added ${data.productId}`);
      } else {
        cart.push(data);
        localStorage.setItem("orderCart", JSON.stringify(cart));
        alert("Added the Product");
      }
    } else {
      alert("Added the Product");
      localStorage.setItem("orderCart", JSON.stringify([data]));
    }
  };

  return (
    <>
      <div className="flex gap-10">
        <div className="flex-auto w-[60%] flex justify-center">
          <div className="h-[500px] m-10">
            <img
              className="w-[500px] h-[500px] object-cover"
              src={product?.images && product.images[0]?.link}
              alt=""
            />
          </div>
        </div>
        <div className="flex-auto w-[40%] space-y-5 mt-5">
          <h2 className="text-xl font-bold">{product_name}</h2>
          <h1 className="text-2xl font-bold">
            Reseller price : {reseller_price}৳
          </h1>
          <p>{warranty}</p>
          <h2 className="font-bold">Product Id : {product_id}</h2>
          <p className={`${is_active ? "text-[#85B643]" : "text-red-600"}`}>
            {is_active ? "In stock" : "Out of stock"}
          </p>
          <div className="space-y-4">
            <div className="space-y-1 flex flex-col">
              <label htmlFor="profit">
                Extra profit amount of suggested price
              </label>
              <div className="flex items-center gap-5">
                <input
                  type="number"
                  min={0}
                  onChange={(e) => setExtraProfit(Math.max(0, e.target.value))}
                  className="border border-gray-400 outline-gray-500 w-[200px] h-[30px] rounded"
                  id="profit"
                />
                <button
                  disabled={isDisable}
                  className={`text-white px-3 py-1 bg-[#85B643]  rounded ${
                    isDisable ? "opacity-50" : "opacity-100"
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
            <h2>
              Total profit would be{" "}
              <span className="font-bold">{totalProfit}৳</span>
            </h2>
            <h2>
              You would sell <span className="font-bold">{totalPrice}৳</span>
            </h2>
          </div>
          <div className="space-y-8">
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
                  value={count}
                  onChange={(e) => handleInput(e.target.value)}
                  className="outline-none w-[50px] h-[30px] text-center [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={handleIncrement}
                  className="text-2xl hover:bg-[#85B643] px-3"
                >
                  +
                </button>
              </div>
              <AddToCart
                data={{
                  productId: product_id,
                  price: totalPrice,
                  profit: totalProfit,
                  quantity: count,
                }}
              />
            </div>
            <div className="flex gap-10">
              <div className="flex justify-center items-center gap-5 ">
                <button
                  onClick={handleWholesaleDecrement}
                  disabled={wholesaleCount == 1 ? true : false}
                  className="text-2xl hover:bg-[#85B643] px-3"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={wholesaleCount}
                  onChange={(e) =>
                    handleWholesaleInput(
                      Math.max(1, parseInt(e.target.value, 10))
                    )
                  }
                  className="outline-none w-[50px] h-[30px] text-center [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={handleWholesaleIncrement}
                  className="text-2xl hover:bg-[#85B643] px-3"
                >
                  +
                </button>
              </div>
              <button className="bg-[#85B643] w-[220px] px-3 flex justify-center items-center gap-3 text-white py-2">
                <ShoppingBasketIcon fontSize="small" />{" "}
                <span>Add to wholesale list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-10">
        <p>
          <span className="text-lg font-bold">Description :</span> {description}
        </p>
      </div>
    </>
  );
};

export default ProductDetails;
