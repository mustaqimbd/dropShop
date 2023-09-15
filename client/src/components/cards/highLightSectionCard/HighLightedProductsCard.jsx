import React from "react";
import { FeaturedProdcutTitle, PriceTitles } from "../../titles/FeatureTitle";
import { HighLightProductImg } from "../../avaters/Avatars";

const HighLightedProductsCard = ({ content }) => {
  console.log(content);
  const { product_name, images, suggested_price } = content;



  //get category data from api 
  

  return (
    <div className="bg-white flex justify-between items-center p-3">
      <div>
        <HighLightProductImg src={images[0]?.link} />
      </div>
      <div className="space-y-3">
        <FeaturedProdcutTitle title={product_name} />

        <PriceTitles title={suggested_price} />
      </div>
    </div>
  );
};

export default HighLightedProductsCard;
