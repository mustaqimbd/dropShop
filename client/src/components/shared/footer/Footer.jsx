
import divider from '../../../assets/Devider.png';
import { AiOutlineRight } from "react-icons/ai";
import google_Playstore from '../../../assets/Mobile App.png';
import Apple_App from '../../../assets/Apple App.png';
import './Footer.css';
const Footer = () => {
    return (
        <div className='w-full'>
  <div style={{ background: "rgba(25, 28, 31, 1)"}} >
            {/* main div of footer part1 */}
         <div className='grid grid-cols-1 md:grid-cols-5 justify-items-center'style={{gap:"34px",padding:"70px 140px" }}>
{/* section 1 of footer */}
<div>
    <div style={{color:"rgba(255, 255, 255, 1)",fontSize:"32px",lineHeight:"40px",fontWeight:"bold",paddingBottom:"34px"}}>DropShop</div>
    <div style={{fontSize:"13px",lineHeight:"20px",color:"rgba(119, 135, 143, 1)"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
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
<div>
<div className='topText'>POPULAR TAG</div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText '>Game</button> <button className=' borderwithText'>Iphone</button> <button className=' borderwithText'>Asus Laptops</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>MacBook</button> <button className=' borderwithText'>SSD</button> <button className=' borderwithText'>Graphics Card</button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>Power Bank</button> <button className=' borderwithText'>Smart TV</button> <button className=' borderwithText'>Speaker </button></div>
<div style={{paddingBottom:"10px"}}><button className=' borderwithText'>Tablet</button> <button className=' borderwithText'>Microwave</button> <button className=' borderwithText'>Samsung </button></div>


</div>





         </div>


{/* footer part 2 */}
<hr
  style={{
    color: "rgba(48, 54, 57, 1)",
    padding: "24px 300px 0px 300px",
    backdropFilter: "blur(10px)", // Add this line for the blur effect
  }}
/>
<div className='footer_part2'>
    <div style={{padding:"24px 0px"}}>© 2023 DropShop Limited.</div>
</div>



        </div>
        </div>
      
    );
};

export default Footer;