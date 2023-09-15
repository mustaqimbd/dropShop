const FeaturedProdcutTitle = ({title}) =>{
return(
    <h3 className="font-sans font-normal normal-case    text-normal">{title.slice(0,32)}...</h3>
)
}

const CategoryTitles = ({title}) =>{
    return <h3 className="font-sans">{title}</h3>
}
const PriceTitles = ({title}) =>{
    return <h3 className="font-sans text-priceText font-semibold"> ৳ {title} </h3>
}




export {
    FeaturedProdcutTitle,
    CategoryTitles,PriceTitles
}