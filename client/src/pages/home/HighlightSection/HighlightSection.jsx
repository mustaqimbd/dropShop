
import { useEffect, useState } from 'react';
import product from '../../../assets/Image.png'
import TopRate_Card from './TopRate_Card';
<<<<<<< HEAD
import ContainerFull from '../../../components/container/ContainerFull';
=======
import ContainerMax from '../../../components/container/ContainerMax';
>>>>>>> 3cc0049b69996998752093732074ffc1219e80e8
const HighlightSection = () => {
    const[topRate,setTopRate]=useState([])
    const[topSelling,setTopSelling]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/api/products/highlight-products')
        .then(res=>res.json())
        .then(data=>{console.log(data);
            setTopRate(data.payload.topRatedProducts)
            setTopSelling(data.payload.topSellingProducts)
        
        
        })
    },[])

    return (
<<<<<<< HEAD
<<<<<<< HEAD
       <ContainerFull>
         <div className="bg-[#F2F4F5] w-full">
         <div className="lg:px-72 md:px-72 py-16  ">
=======
        <div className="lg:px-56 md:px-56 py-16 bg-[#F2F4F5] w-full">
>>>>>>> 520964dc6f9426c8232816896c8164a1cbba187d
=======
        <div className="px-10  py-16 bg-[#F2F4F5] w-full">
            <ContainerMax>
>>>>>>> 3cc0049b69996998752093732074ffc1219e80e8
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-items-center lg:px-0 md:px-0 px-10">

        
<div>
<div className='text-base text-heading font-sans pb-3'>Top Rated</div>
{topRate.map(index=><TopRate_Card key={index._id} slug={index.product_name} taka={index.reseller_price} prd_image={index.images[0].link}/>
)}
</div>
   






<div>
<<<<<<< HEAD
<div className='TopText_of_Highlight'>Top Rated</div>
{topSelling.map(index=><TopRate_Card key={index._id} slug={index.product_name} taka={index.reseller_price} prd_image={index.images[0].link}/>
=======
<div className='text-base text-heading font-sans pb-3'>FlASH SALE TODAY</div>
{topRate.map(index=><TopRate_Card key={index._id} slug={index.product_name} taka={index.reseller_price} prd_image={index.images[0].link}/>
>>>>>>> 520964dc6f9426c8232816896c8164a1cbba187d
)}
</div>
   
<div>
<div className='text-base text-heading font-sans pb-3'>POPULAR Category</div>
<div className='pb-2.5'><button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Game</button> <button  className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Iphone</button> <button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>TV</button> <button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Asus Laptops</button></div>
<div className='pb-2.5'><button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>MacBook</button> <button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>SSD</button> <button  className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Graphics Card</button></div>
<div className='pb-2.5'><button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Power Bank</button> <button  className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Smart TV</button> <button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Speaker </button></div>
<div className='pb-2.5'><button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Tablet</button> <button  className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Microwave</button> <button className=' border border-1 text-sm font-sans text-heading p-1.5 border-borderColor'>Samsung </button></div>
</div>




<div  className='w-full flex justify-center items-center bg-[#124261]'>
    
    <div className='text-center px-1 py-10 lg:py-0 md:py-0'>
    <button className='font-sans text-sm font-bold bg-discountbtn border border-1 border-discountbtn text-white rounded-sm'>SUMMER SALES</button>
    <div className='text-white font-sans font-semibold text-2xl my-2'>37% DISCOUNT</div>
    <div className='text-sm font-bold font-sans text-heading my-2'>only for <span  className='mx-1 text-smarphone'>SmartPhone</span> product.</div>
  
   <button className='text-white bg-[#83B735] px-6 py-2 text-sm leading-5 flex my-2 mx-auto'><span className='me-2'>Shop Now</span>
   <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.125 10.6322H16.875" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  <path d="M11.25 5.0072L16.875 10.6322L11.25 16.2572" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
</svg>

</button>
</div>
</div>









            </div>
            
            </ContainerMax>
        </div>
        </div>
       </ContainerFull>
    );
};

export default HighlightSection;