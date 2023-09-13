import { BsBoxSeam,BsWallet } from "react-icons/bs";
import { IoTrophyOutline } from "react-icons/io5";
import { PiHeadphonesThin } from "react-icons/pi";
import "./HighlightPolicy.css"
const HighlightPolicy = () => {
    return (
        <div >
  <div className="Highlight_policy_div" >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 justify-items-center border border-1" style={{ margin: "100px 220px 0px", borderRadius: "5px" }}>
                <div className="flex items-center gap-3   relative group"style={{padding:"17px"}}>
                    <div><BsBoxSeam size={30} style={{color:"rgba(71, 81, 86, 1)"}}/></div>
                    <div><div className="title">FASTEST DELIVERY</div><div className="subtitle">Delivery in 24/H</div></div>
                    <div className="line-after"></div>

                </div>

                <div className="flex items-center gap-3  justify-center relative group" style={{padding:"17px"}}>
                    <div><IoTrophyOutline size={30} style={{color:"rgba(71, 81, 86, 1)"}}/></div>
                    <div><div className="title">24 HOURS RETURN</div><div className="subtitle">100% money-back</div></div>
                    <div className="line-after"></div>

                </div>

                <div className="flex items-center gap-3   relative group" style={{padding:"17px"}}>
                    <div><BsWallet size={25} style={{color:"rgba(71, 81, 86, 1)"}}/></div>
                    <div><div className="title">SECURE PAYMENT</div><div className="subtitle">Your money is safe</div></div>
                    <div className="line-after"></div>

                 </div>

                <div className="flex items-center gap-3  "style={{padding:"17px"}} >
                    <div><PiHeadphonesThin size={35} style={{color:"rgba(71, 81, 86, 1)"}}/></div>
                    <div><div className="title">SUPPORT 24/7</div><div className="subtitle">Live contact/message</div></div>
                </div>
            </div>
        </div>
        </div>
      
    );
};

export default HighlightPolicy;



