
import { useEffect, useState } from 'react';

import ContainerFull from '../../../components/container/ContainerFull';
import ContainerMax from '../../../components/container/ContainerMax';
import HighLightedProductsCard from '../../../components/cards/highLightSectionCard/HighLightedProductsCard';
const HighlightSection = () => {
    const[topRate,setTopRate]=useState([])
    const[topSelling,setTopSelling]=useState([])
    
    useEffect(()=>{
        fetch('http://localhost:5000/api/products/highlight-products')
        .then(res=>res.json())
        .then(data=>{console.log(data);
            setTopRate(data.payload.topRatedProducts)
            setTopSelling(data.payload.topSellingProducts)
        console.log(topRate);
        
        })
    },[])

    return (
        <ContainerFull>
    <div className='bg-iconBg py-20'>

<ContainerMax>

  <div className='flex justify-between gap-6'>

    <div className='flex-1 space-y-4'>
<h1 className='uppercase'>
  top Rated
</h1>

<div className='flex-1 space-y-4'>
{
  topRate.map((item,index)=> <HighLightedProductsCard key={index} content={item}></HighLightedProductsCard>)
}
</div>

    </div>
    <div className='flex-1 space-y-4'>

    <h1 className='uppercase'>
  top Rated
</h1>

<div className='grid grid-cols-1 gap-3'>
{
  topSelling.map((item,index)=> <HighLightedProductsCard key={index} content={item}></HighLightedProductsCard>)
}
</div>


    </div>
    <div className='flex-1 space-y-4'>
<h1 className='uppercase'>
Popular Category
</h1>

<div className=''>
 <span> </span>
</div>
    </div>
    <div className='flex-1 space-y-4'>

    </div>
  </div>
</ContainerMax>


    </div>
    </ContainerFull>
       
            
            
         
    );
};

export default HighlightSection;