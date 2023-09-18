// feature product cards

import { FeaturedProductImage } from "../../avaters/Avatars";
import { EmptyStarIcons } from "../../icons/Icons";

// @ api = "./feature product.json"
const FeatureProductCard = ({ product }) => {
  return (
    <div className="h-80 w-60 bg-slate-500">
      <FeaturedProductImage
        src={product.images[0]?.link}
        title={product.product_name}
      ></FeaturedProductImage>
      {
        // <EmptyStarIcons />
      }
    </div>
  );
};

export { FeatureProductCard };
