// feature product cards

import Rating from '@mui/material/Rating';
import { PriceTitles } from '../../titles/FeatureTitle';
// @ api = "./feature product.json"
const FeatureProductCard = ({ product }) => {
    console.log(product)
    return <div className="  space-y-2">
       <img className=" object-contain h-52 w-60 p-2" src={product?.images[0]?.link} alt="" />
       <div className='flex gap-2 items-center'>
       <Rating color='' name="read-only" value={product?.ratings} readOnly /> <span className='text-ratingCount'>(567)</span>
       </div>
       <h1 className=' font-semibold text-heading '>{product?.product_name.slice(0,40)} { product?.product_name.length>40 ? '...': '' } </h1>
       <p className='font-semibold TEXT-NORMAL text-priceText'> ৳ {product?.reseller_price}</p>
    </div>
  );
};

export { FeatureProductCard };
