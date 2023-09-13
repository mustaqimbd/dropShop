import { useEffect, useState } from "react";
import FeaturedCarts from "../../../components/carts/FeaturedProducts/FeaturedCarts";
import { FeaturedProdcutTitle } from "../../../components/titles/TitlesGazi";
import { ViewAllButton } from "../../../components/buttons/Buttons";
import ContainerMax from "../../../components/container/ContainerMax";


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
            <ViewAllButton title={"view all"} />
            </div >
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mt-12'>
            {
                categories.map((category,index) => <FeaturedCarts key={index} category={category}/>)
            }
            </div>
        </div>
        </ContainerMax>
    );
};

export default FeaturedProducts;