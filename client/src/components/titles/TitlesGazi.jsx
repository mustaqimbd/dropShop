const FeaturedProdcutTitle = ({title}) =>{
return(
    <h3 className="font-['sans'] font-[400] text-[24px]">{title}</h3>
)
}

const CategoryTitles = ({title}) =>{
    return <h3 className="font-sans">{title}</h3>
}

export {
    FeaturedProdcutTitle,
    CategoryTitles
}