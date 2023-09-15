import { useEffect, useState } from "react";
import ContainerMax from "../../../components/container/ContainerMax";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FeatureCards from "../../../components/carts/FeaturedProducts/FeatureCards";
import { FeaturedProdcutTitle } from "../../../components/titles/Featuretitle";


const FeaturedProducts = () => {
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        fetch("category.json")
        .then(res => res.json())
        .then(data => {
            setCategories(data)
            console.log(data)
        })
    },[])

    return (
        <ContainerMax>
            <div className="mt-14">
            <div className="flex justify-between">
            <FeaturedProdcutTitle title={"Product Categories"}/>
            <h3 className="font-sans">View All <ChevronRightIcon /> </h3>
            </div >
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mt-12'>
            {
                categories.map((category,index) => <FeatureCards key={index} category={category}/>)
            }
            </div>
        </div>
        </ContainerMax>
    );
};

export default FeaturedProducts;