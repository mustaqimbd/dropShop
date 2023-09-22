import Lottie from "react-lottie";
import ContainerMax from "../../components/container/ContainerMax";
import chatting from "../../../public/chat.json"
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
        <div>
<ContainerMax>
    <div>
        <h1>A better way to talk with our customers</h1>
        <p>Manage all your customer conversations in one platform that feels just like your inbox</p>
        <div>
            <button>Try for free</button>
            <button>Get a demo</button>
        </div>
    </div>
    <div>
   
 

      <Lottie options={defaultOptions}
            
         />
    </div>
</ContainerMax>
        </div>
    );
};

export default Need_Help;
