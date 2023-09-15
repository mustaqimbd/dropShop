import { useEffect, useState } from "react";
<<<<<<< HEAD
import FeaturedCarts from "../../../components/carts/FeaturedProducts/FeaturedCarts";
import { FeaturedProdcutTitle } from "../../../components/titles/TitlesGazi";
import { ViewAllButton } from "../../../components/buttons/Buttons";
import ContainerMax from "../../../components/container/ContainerMax";
=======
import FeaturedCarts from "../../../components/carts/FeaturedCarts";
import { FeaturedProdcutTitle } from "../../../components/titles/TitlesGazi";
import { ViewAllButton } from "../../../components/buttons/Buttons";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
>>>>>>> 520964dc6f9426c8232816896c8164a1cbba187d


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
                categories.map((category,index) => <FeaturedCarts key={index} category={category}/>)
            }
            </div>
        </div>
        </ContainerMax>
    );
};

export default FeaturedProducts;