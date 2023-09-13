
import { useEffect, useState } from 'react';
import product from '../../../assets/Image.png'
import './HighlightSection.css'
import TopRate_Card from './TopRate_Card';
const HighlightSection = () => {
    const[topRate,setTopRate]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/api/products/highlight-products')
        .then(res=>res.json())
        .then(data=>{console.log(data);
            setTopRate(data.payload.topRatedProducts)
        
        
        })
    },[])

    return (
        <div className="lg:px-72 md:px-72 py-16 bg-[#F2F4F5] w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-items-center lg:px-0 md:px-0 px-10">


<div>
<div className='TopText_of_Highlight'>Top Rated</div>
{topRate.map(index=><TopRate_Card key={index._id} slug={index.product_name} taka={index.reseller_price} prd_image={index.images[0].link}/>
)}
</div>
   






<div>
<div className='TopText_of_Highlight'>Top Rated</div>
{topRate.map(index=><TopRate_Card key={index._id} slug={index.product_name} taka={index.reseller_price} prd_image={index.images[0].link}/>
)}
</div>
   
<div>
<div className='TopText_of_Highlight'>POPULAR Category</div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2 '>Game</button> <button className=' borderwithText2'>Iphone</button> <button className=' borderwithText2'>TV</button> <button className=' borderwithText2'>Asus Laptops</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>MacBook</button> <button className=' borderwithText2'>SSD</button> <button className=' borderwithText2'>Graphics Card</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>Power Bank</button> <button className=' borderwithText2'>Smart TV</button> <button className=' borderwithText2'>Speaker </button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>Tablet</button> <button className=' borderwithText2'>Microwave</button> <button className=' borderwithText2'>Samsung </button></div>
</div>




<div  className='w-full flex justify-center items-center bg-[#124261]'>
    
    <div className='text-center px-1 py-10 lg:py-0 md:py-0'>
    <button className='summer'>SUMMER SALES</button>
    <div className='percent_discount my-2'>37% DISCOUNT</div>
    <div className='offerProduct my-2'>only for <span style={{ color: "#EBC80C", }} className='mx-1'>SmartPhone</span> product.</div>
  
   <button className='text-white bg-[#83B735] px-6 py-2 text-sm leading-5 flex my-2 mx-auto'><span className='me-2'>Shop Now</span>
   <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.125 10.6322H16.875" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  <path d="M11.25 5.0072L16.875 10.6322L11.25 16.2572" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
</svg>

</button>
</div>
</div>









            </div>
            
            
        </div>
    );
};

export default HighlightSection;