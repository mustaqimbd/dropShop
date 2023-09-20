// feature product cards

import Rating from "@mui/material/Rating";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

// @ api = "./feature product.json"
const FeatureProductCard = ({ product }) => {
  // console.log(product);
  return (
    <div className="  space-y-2">
      <img
        className=" object-contain h-52 w-60 p-2"
        src={product?.images[0]?.link}
        alt=""
      />
      <div className="flex gap-2 items-center">
        <Rating color="" name="read-only" value={product?.ratings} readOnly />{" "}
        <span className="text-ratingCount">(567)</span>
      </div>
      <h1 className=" font-semibold text-heading ">
        {product?.product_name.slice(0, 40)}{" "}
        {product?.product_name.length > 40 ? "..." : ""}{" "}
      </h1>
      <p className="font-semibold TEXT-NORMAL text-priceText">
        {" "}
        ৳ {product?.reseller_price}
      </p>
    </div>
  );
};

const CategoriesProductCard = ({ product }) => {
  // console.log(product);
  //
  return (
    <div className="bg-white  flex flex-col justify-between ">
      <div className="flex justify-center  items-center">
        <img
          className=" object-cover h-52 w-full "
          src={product?.images[0]?.link}
          alt=""
        />
      </div>

      <div className="flex  rounded-md  flex-col p-3 ">
        <div className="p-1 space-y-1">
          <div className="flex  gap-2 ">
            <Rating
              color=""
              name="read-only"
              value={product?.ratings}
              readOnly
            />{" "}
            <span className="text-ratingCount">(567)</span>
          </div>
          <h1 className=" font-semibold text-heading ">
            {product?.product_name.slice(0, 40)}{" "}
            {product?.product_name.length > 40 ? "..." : ""}{" "}
          </h1>
          <p className="font-semibold text-xl text-priceText">
            {" "}
            ৳ {product?.reseller_price}
          </p>
        </div>
      </div>

      <button className="bg-slate-400 w-full px-3 flex justify-center items-center gap-4 text-white py-2">
        <ShoppingBasketIcon /> Add to Cart
      </button>
    </div>
  );
};

export { FeatureProductCard, CategoriesProductCard };
