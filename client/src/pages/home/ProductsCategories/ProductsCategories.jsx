import { useEffect, useState } from "react";
import ContainerMax from "../../../components/container/ContainerMax";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



import { FeaturedProdcutTitle } from "../../../components/titles/FeatureTitle";
import {ProductCards} from "../../../components/cards/FeaturedProducts/Cards"



const ProductsCategories = () => {
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        fetch("category.json")
        .then(res => res.json())
        .then(data => {
            setCategories(data)
            // console.log(data)
        })
    },[])

    return (
        <ContainerMax>
            <div className="my-14">
            <div className="flex justify-between">
            <FeaturedProdcutTitle title={"Product Categories"}/>
            <h3 className="font-sans">View All <ChevronRightIcon /> </h3>
            </div >
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mt-12 gap-16'>
            {
                categories.map((category,index) => <ProductCards key={index} category={category}/>)
            }
            </div>
        </div>
        </ContainerMax>
    );
};

export default ProductsCategories;