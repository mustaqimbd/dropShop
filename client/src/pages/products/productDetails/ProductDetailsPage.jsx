import { useParams } from "react-router-dom";
import useGetRequest from "../../../hooks/useGetRequest";
import ImagesCarousel from "./productDetailsComponents/ImagesCarousel";
import ProductDescriptionTab from "./productDetailsComponents/productDescriptionTab/ProductDescriptionTab";
import ProfitCalculate from "./productDetailsComponents/ProfitCalculate";
import {
  ProductTitleForDetailsPage,
  ResellerPriceTitle,
} from "../../../components/titles/FeatureTitle";
import { Rating, Typography } from "@mui/material";


const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const { data } = useGetRequest(
    "product-details",
    `products/details/${productSlug}`
  );
  const product = data?.payload ?? {};
  
  const {
    _id,
    product_name,
    product_id,
    reseller_price,
    suggested_price,
    is_active,
  } = product;

 

  return (
    <>
      <div className="flex gap-20 mx-5">
        <div className="flex-1 flex flex-col justify-center max-w-[600px]">
          <ImagesCarousel images={product?.images} />
        </div>
        <div className="flex-1 space-y-5 mt-5 ">
          <div>
            <ProductTitleForDetailsPage title={product_name} />
            <div className="flex gap-2">
              <Rating
                name="half-rating-read"
                color="ratingIcon"
                defaultValue={4.5}
                precision={0.5}
                readOnly
              />
              <Typography variant="p" component="h2">
                4.8
              </Typography>
              <Typography variant="p" color="gray">
                (6380)
              </Typography>
            </div>
            <div className="space-y-2 mt-2">
              <p className=" font-[600] ">
                <span className="text-[#5F6C72]">Brand: </span>
                <span>Joyroom</span>
              </p>
              <p className=" font-[600] ">
                <span className="text-[#5F6C72]">Category: </span>
                <span>headphone</span>
              </p>
              <p className="text-lg font-[600]">
                <span className="text-[#5F6C72]">Product Id : </span>
                <span>{product_id}</span>
              </p>
            </div>
            <div className="mt-4">
              <ResellerPriceTitle title={reseller_price} />
              <p className="text-lg font-[600] ">
                <span className="text-[#5F6C72]">Availability: </span>
                <span
                  className={`${is_active ? "text-offBadge" : "text-red-600"}`}
                >
                  {is_active ? "In stock" : "Out of stock"}
                </span>
              </p>
            </div>
          </div>
          <ProfitCalculate
            id={_id}
            reseller_price={reseller_price}
            suggested_price={suggested_price}
          />
        </div>
      </div>
      <div className="my-10">
        <ProductDescriptionTab />
      </div>
    </>
  );
};

export default ProductDetailsPage;
