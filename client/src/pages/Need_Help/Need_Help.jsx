import Lottie from "react-lottie";
import ContainerMax from "../../components/container/ContainerMax";
import chatting from "../../../public/chat.json"
import { TryFreeButton } from "../../components/buttons/Buttons";
import video from '../../assets/customer_service.mp4'
import { Link } from 'react-scroll';
import Video from "../../components/Video/Video";
const Need_Help = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: chatting,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };


    return (
        <div className="py-28">
<ContainerMax>
    <div className="px-12 flex justify-center items-center gap-10">
    <div className="flex-1">
        <div className="flex-column space-y-4 px-20">
        <h1 className="text-5xl font-bold font-sans text-heading ">A better way to talk with our customers</h1>
        <p className="text-normal text-heading">Manage all your customer conversations in one platform that feels just like your inbox</p>
    <div className="flex space-between gap-4">
            <TryFreeButton title="Try for free"/>
          
     <button className="bg-white border border-1 border-primary w-full px-3 py-2" >
    <span className="font-sans text-primary">  <Link to="customer_service"smooth={true} spy={true} >Get a demo</Link></span>
     </button>  
        </div>
        </div>
    </div>
    <div className="flex-1">
   <Lottie options={defaultOptions}/>
    </div>
    </div>
   

   <Video id="customer_service"video={video}/>
  



</ContainerMax>
        </div>
    );
};

export default Need_Help;
