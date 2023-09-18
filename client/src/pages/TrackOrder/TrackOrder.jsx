import CustomizedSteppers from "../../components/Stepper/Stepper";
import TrackItem from "../../components/cards/TrackItem/TrackItem";
import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { TracOrdertitle } from "../../components/titles/FeatureTitle";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
const TrackOrder = () => {
    let id ="OD23244545425"
    return (
<ContainerFull>
<div className="bg-gray py-5 border-b-2 border-borderColor px-14">
<ContainerMax>
<TracOrdertitle title={"My Orders/Tracking"}/>
<p className="text-base font-sans text-heading  py-5 ">Order ID : {id}</p>
   <div className="flex justify-between gap-4 font-sans border border-borderColor p-4">
<TrackItem information_name={"Estimated Delivery time:"} information={"24 Nov 2022"}/>
<TrackItem information_name={"Shipping By:"} information={ 
    <p className="text-heading font-sans text-base"> BLUEDART,| <PhoneEnabledIcon /> +1598759364
    </p>

  }/>
<TrackItem information_name={"Status:"} information={"Picked by the currier"}/>
<TrackItem information_name={"Tracking#:"} information={"BD04535352345"}/>

   </div>
   <div className="w-full py-12">
<CustomizedSteppers orderid={id}/>
</div>
</ContainerMax>
</div>
</ContainerFull>
    );
};

export default TrackOrder;