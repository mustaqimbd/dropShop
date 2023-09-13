
import product from '../../../assets/Image.png'
import './HighlightSection.css'
import TopRate_Card from './TopRate_Card';
const HighlightSection = () => {
    return (
        <div style={{padding:"72px 294px 72px",backgroundColor:"rgba(242, 244, 245, 1)"}}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6"style={{padding:""}}>


<div>
<div className='TopText_of_Highlight'>Top Rated</div>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
</div>
   






<div>
<div className='TopText_of_Highlight'>Top Sales</div>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
<TopRate_Card slug="Sony DSCHX8 High Zoom Point & Shoot Camera"taka="1860"prd_image={product}/>
</div>
   
<div>
<div className='TopText_of_Highlight'>POPULAR Category</div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2 '>Game</button> <button className=' borderwithText2'>Iphone</button> <button className=' borderwithText2'>TV</button> <button className=' borderwithText2'>Asus Laptops</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>MacBook</button> <button className=' borderwithText2'>SSD</button> <button className=' borderwithText2'>Graphics Card</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>Power Bank</button> <button className=' borderwithText2'>Smart TV</button> <button className=' borderwithText2'>Speaker </button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText2'>Tablet</button> <button className=' borderwithText2'>Microwave</button> <button className=' borderwithText2'>Samsung </button></div>
</div>




<div style={{background:"rgba(18, 66, 97, 1)"}} className='flex justify-center items-center'>
    <div className='text-center'>
    <button className='summer'>SUMMER SALES</button>
    <div className='percent_discount my-2'>37% DISCOUNT</div>
    <div className='offerProduct my-2'>only for <span style={{ color: "#EBC80C", }} className='mx-1'>SmartPhone</span> product.</div>
  
   <button className='text-white bg-[#83B735] px-6 py-2 text-sm leading-5 flex my-2 mx-auto'><span className='me-2'>Shop Now</span>
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.125 10.6322H16.875" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.25 5.0072L16.875 10.6322L11.25 16.2572" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
</div>
</div>









            </div>
            
            
        </div>
    );
};

export default HighlightSection;