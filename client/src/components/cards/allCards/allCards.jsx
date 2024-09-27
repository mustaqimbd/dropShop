import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const FeatureProductCard = ({ product }) => {
 
  return (
    <Link
      to={`/product-category/${product?.category_slug}/${product?.product_slug}`}
    >
      <div className="space-y-2">
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
    </Link>

  );
};

const CategoriesProductCard = ({ product }) => {
  return (
    <Link
      to={`/product-category/${product?.category_slug}/${product?.product_slug}`}
      className="bg-white flex flex-col justify-between w-52"
    >
      <div className="flex justify-center  items-center">
        <img
          className=" object-cover h-52 w-full "
          src={product?.images[0]?.link}
          alt={product?.product_name}
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
    </Link>
  );
};

export { FeatureProductCard, CategoriesProductCard };
