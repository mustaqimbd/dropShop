const FeaturedProdcutTitle = ({title}) =>{
return(
    <h3 className="font-sans font-normal normal-case text-sm    text-normal">{title.slice(0,32)}...</h3>
)
}

const CategoryTitles = ({title}) =>{
    return <h3 className="font-sans">{title}</h3>
}
const PriceTitles = ({title}) =>{
    return <h3 className="font-sans text-priceText font-semibold text-sm"> ৳ {title} </h3>
}

const FeatureProduct = ({title}) =>{
    return <h3 className="font-sans text-[24px] font-semibold">{title}</h3>
}


export {
    FeaturedProdcutTitle,
    CategoryTitles,PriceTitles,
    FeatureProduct
}