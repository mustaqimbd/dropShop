

// feature product cards 

import { FeaturedProductImage } from "../../avaters/Avatars"

// @ api = "./feature product.json"
const FeatureProductCard = ({product}) =>{
    console.log(product)
    return <div className="h-80 w-60">
        <FeaturedProductImage src={product.images[0]?.link} title={product.product_name} ></FeaturedProductImage>
    </div> 
}


export {
    FeatureProductCard
}