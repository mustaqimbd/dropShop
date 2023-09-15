
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

    <div className='topText'>Top Category</div>
    <div className='div'>Computer & Laptop</div>
    <div className='div'>SmartPhone</div>
    <div className='div flex items-center'> <div className='me-2'><img src={divider} alt="divider"/></div>   <div>Accessories</div>           </div>
    <div className='div'>Camera & Photo</div>
    <div className='div'>TV & Homes</div>
    <div className='div flex items-center'>  <div style={{color:"rgba(131, 183, 53, 1)"}}>Browse All Product</div>         <div><AiOutlineRight size={20} style={{color:"rgba(131, 183, 53, 1)"}}/></div>          </div>

</div>

{/* section 3 of footer */}
<div>
    {/* Tob Text of footer Section */}
    <div className='topText'>Quick links</div>

    <div className='div'>Shop Product</div>
    <div className='div'>Shoping Cart</div>
    <div className='div'>Compare</div>
    <div className='div'>Track Order</div>
    <div className='div'>Compare</div>
    <div className='div'>About Us</div>
</div>

{/* section 4 of footer */}
<div>
    {/* Tob Text of footer Section */}
<div className='topText'>DOWNLOAD APP</div>
<div><img src={google_Playstore} style={{width:"176px",height:"60px",marginBottom:"12px"}} alt="google playstore"/></div>
<div><img src={Apple_App} alt="apple" style={{width:"176px",height:"60px"}}/></div>
</div>





{/* section 5 of footer */}
<div className='lg:pb-0 pb-6 md:pb-0'>
<div className='topText'>POPULAR TAG</div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText '>Game</button> <button className=' borderwithText'>Iphone</button> <button className=' borderwithText'>Asus Laptops</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>MacBook</button> <button className=' borderwithText'>SSD</button> <button className=' borderwithText'>Graphics Card</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>Power Bank</button> <button className=' borderwithText'>Smart TV</button> <button className=' borderwithText'>Speaker </button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>Tablet</button> <button className=' borderwithText'>Microwave</button> <button className=' borderwithText'>Samsung </button></div>


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


