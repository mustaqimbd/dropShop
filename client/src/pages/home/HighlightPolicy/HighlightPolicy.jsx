import { BsBoxSeam } from "react-icons/bs";
import "./HighlightPolicy.css"
const HighlightPolicy = () => {
    return (
        <div>
            <div className="grid grid-cols-1 grid-cols-4 gap-0 justify-items-center" style={{ padding: "0px 220px" }}>

                <div className="flex items-center gap-3   relative group"style={{padding:"17px"}}>
                    <div><BsBoxSeam size={30} /></div>
                    <div><div className="title">FASTEST DELIVERY</div><div className="subtitle">Delivery in 24/H</div></div>
                    <div className="line-after"></div>

                </div>

                <div className="flex items-center gap-3  justify-center relative group" style={{padding:"17px"}}>
                    <div><BsBoxSeam size={30} /></div>
                    <div><div className="title">FASTEST DELIVERY</div><div className="subtitle">Delivery in 24/H</div></div>
                    <div className="line-after"></div>

                </div>

                <div className="flex items-center gap-3   relative group" style={{padding:"16px"}}>
                    <div><BsBoxSeam size={30} /></div>
                    <div><div className="title">FASTEST DELIVERY</div><div className="subtitle">Delivery in 24/H</div></div>
                    <div className="line-after"></div>

                 </div>

                <div className="flex items-center gap-3  "style={{padding:"17px"}} >
                    <div><BsBoxSeam size={30} /></div>
                    <div><div className="title">FASTEST DELIVERY</div><div className="subtitle">Delivery in 24/H</div></div>
                </div>
            </div>
        </div>
    );
};

export default HighlightPolicy;



