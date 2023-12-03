import { BsBoxSeam, BsWallet } from "react-icons/bs";
import { IoTrophyOutline } from "react-icons/io5";
import { PiHeadphonesThin } from "react-icons/pi";
import "./HighlightPolicy.css";
import ContainerMax from "../../../components/container/ContainerMax";
const HighlightPolicy = () => {
  return (
    <ContainerMax>
      <div className="bg-white">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-0 md:gap-0 justify-items-center lg:border md:border lg:border-1  md:border-1 md:pb-0 pb-5 pt-5 lg:pt-0 md:pt-0 lg:mx-56 mb-0 lg:mt-24 md:mt-24"
          style={{ borderRadius: "5px" }}
        >
          <div className="flex items-center gap-3 relative group lg:p-4 md:p-4">
            <div>
              <BsBoxSeam size={25} style={{ color: "rgba(71, 81, 86, 1)" }} />
            </div>
            <div>
              <div className="title">FASTEST DELIVERY</div>
              <div className="subtitle">Delivery in 24/H</div>
            </div>
            <div className="line-after hidden lg:block"></div>
          </div>

          <div className="flex items-center gap-3  relative group  lg:p-4 md:p-4 ">
            <div>
              <IoTrophyOutline
                size={25}
                style={{ color: "rgba(71, 81, 86, 1)" }}
              />
            </div>
            <div>
              <div className="title">24 HOURS RETURN</div>
              <div className="subtitle">100% money-back</div>
            </div>
            <div className="line-after hidden lg:block"></div>
          </div>

          <div className="flex items-center gap-3    relative group  lg:p-4 md:p-4 ">
            <div>
              <BsWallet size={25} style={{ color: "rgba(71, 81, 86, 1)" }} />
            </div>
            <div>
              <div className="title">SECURE PAYMENT</div>
              <div className="subtitle">Your money is safe</div>
            </div>
            <div className="line-after hidden lg:block"></div>
          </div>

          <div className="flex items-center gap-3  lg:p-4 md:p-4  ">
            <div>
              <PiHeadphonesThin
                size={35}
                style={{ color: "rgba(71, 81, 86, 1)" }}
              />
            </div>
            <div>
              <div className="title">SUPPORT 24/7</div>
              <div className="subtitle">Live contact/message</div>
            </div>
          </div>
        </div>
      </div>
    </ContainerMax>
  );
};

export default HighlightPolicy;
