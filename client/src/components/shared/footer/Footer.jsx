
import divider from '../../../assets/Devider.png';
import { AiOutlineRight } from "react-icons/ai";
import google_Playstore from '../../../assets/Mobile App.png';
import Apple_App from '../../../assets/Apple App.png';
import './Footer.css';
import ContainerMax from '../../container/ContainerMax';
const Footer = () => {
    return (
        <div className='w-full '>
  <div style={{ background: "rgba(25, 28, 31, 1)"}} >
<ContainerMax>
            {/* main div of footer part1 */}
         <div className='grid grid-cols-1 md:grid-cols-5   lg:py-16  gap-8 justify-items-center'>
{/* section 1 of footer */}
<div className='mx-auto justify-self-center lg:text-start text-center lg:pt-0 md:pt-0 pt-5'>
    
    <div style={{color:"rgba(255, 255, 255, 1)"}}className='font-bold pb-6 text-3xl'>DropShop</div>
    <div style={{color:"rgba(119, 135, 143, 1)"}} className='text-sm lg:px-0 md:px-0 px-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
    
 
</div>
{/* section 2 of footer */}
<div>
    {/* Tob Text of footer Section */}
    
   

    <div className='pb-3 text-white text-base font-sans'>Top Category</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Computer & Laptop</div>
    <div  className='mb-2 text-footerLinkText text-sm  font-sans'>SmartPhone</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans flex items-center'> <div className='me-2'><img src={divider} alt="divider"/></div>   <div className='font-bold'>Accessories</div>           </div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Camera & Photo</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>TV & Homes</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans flex items-center'>  <div style={{color:"rgba(131, 183, 53, 1)"}}>Browse All Product</div>         <div><AiOutlineRight size={20} style={{color:"rgba(131, 183, 53, 1)"}}/></div>          </div>

</div>

{/* section 3 of footer */}
<div>
    {/* Tob Text of footer Section */}
    <div className='pb-3 text-white text-base font-sans'>Quick Links</div>

    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Shop Product</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Shoping Cart</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Compare</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Track Order</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>Compare</div>
    <div className='mb-2 text-footerLinkText text-sm  font-sans'>About Us</div>
</div>

{/* section 4 of footer */}
<div>
    {/* Tob Text of footer Section */}
    <div className='pb-3 text-white text-base font-sans'>Download App</div>
<div><img src={google_Playstore} style={{width:"176px",height:"60px",marginBottom:"12px"}} alt="google playstore"/></div>
<div><img src={Apple_App} alt="apple" style={{width:"176px",height:"60px"}}/></div>
</div>





{/* section 5 of footer */}
<div className='lg:pb-0 pb-6 md:pb-0'>
<div className='pb-3 text-white text-base font-sans'>Popular Tag</div>
<div style={{paddingBottom:"10px"}}><button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Game</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Iphone</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Asus Laptops</button></div>
<div style={{paddingBottom:"10px"}}><button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>MacBook</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>SSD</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Graphics Card</button></div>
<div style={{paddingBottom:"10px"}}><button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Power Bank</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Smart TV</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Speaker </button></div>
<div style={{paddingBottom:"10px"}}><button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Tablet</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Microwave</button> <button className=' border border-1 border-borderColor p-1.5 text-[13px] font-sans text-footerLinkText'>Samsung </button></div>


</div>





         </div>

         </ContainerMax>
{/* footer part 2 */}
<hr
  style={{
    color: "rgba(48, 54, 57, 1)",
    
  }} className='md:backdrop-blur-md'
/>
<div className='text-white font-sans py-6 text-center text-[13px]'>
    <div >© 2023 DropShop Limited.</div>
</div>



        </div>
        </div>
      
    );
};

export default Footer;


