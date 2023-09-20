import { FeaturedProdcutTitle, PriceTitles } from "../../titles/FeatureTitle";
import { HighLightProductImg } from "../../avaters/Avatars";

const HighLightedProductsCard = ({ content }) => {
  const { product_name, images, suggested_price } = content;

  //get category data from api

  return (
    <div className="bg-white flex gap-4 rounded-sm items-center p-2">
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
