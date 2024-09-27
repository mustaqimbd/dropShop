import { FeaturedProdcutTitle, PriceTitles } from "../../titles/FeatureTitle";
import { HighLightProductImg } from "../../avaters/Avatars";
import { NavLink } from "react-router-dom";

const HighLightedProductsCard = ({ content }) => {
  const { product_name, images, suggested_price, category } = content;

  //get category data from api

  return (
    <NavLink to={`/product-category/${category?.slug}`}>
      <div className="bg-white flex flex-1 gap-4 rounded-sm items-center p-2">
        <div>
          <HighLightProductImg src={images[0]?.link} />
        </div>
        <div className="space-y-3">
          <FeaturedProdcutTitle title={product_name} />
          <PriceTitles title={suggested_price} />
        </div>
      </div>
    </NavLink>

  );
};

export default HighLightedProductsCard;
