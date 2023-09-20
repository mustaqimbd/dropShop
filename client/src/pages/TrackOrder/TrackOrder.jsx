import { useEffect, useState } from "react";
import CustomizedSteppers from "../../components/Stepper/Stepper";
import TrackItem from "../../components/cards/TrackItem/TrackItem";
import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { TracOrdertitle } from "../../components/titles/FeatureTitle";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { BackToOrderBtn } from "../../components/buttons/Buttons";
import { Link } from "react-router-dom";
import HighLightedProductsCard from "../../components/cards/highLightSectionCard/HighLightedProductsCard";
import {  useForm } from "react-hook-form";
const TrackOrder = () => {
  const[orderId,setOrderId]=useState(null)
    const[Track,setTrack]=useState([])
           useEffect(() => {
           fetch("http://localhost:5000/api/products/highlight-products")
          .then(res => res.json())
          .then(data => {
           setTrack(data.payload.topSellingProducts);
          });
      }, []);

    const { register, handleSubmit,  reset } = useForm();
      const handleSearch = (data) => {
      console.log( data.title);
      setOrderId(data.title);
      reset();
    };
    return (
<ContainerFull>
<div className="bg-gray py-5 border-b-2 border-borderColor px-14">
<ContainerMax>

<TracOrdertitle title={"My Orders/Tracking"}/>
{/* <div className="text-base font-sans text-heading  py-5 ">Order ID : {orderId}</div> */}
{/* submit order id */}
<form onSubmit={handleSubmit(handleSearch)} className="py-5">
      
      
      <input type="text"className="border border-1 py-2 px-4" id="title"placeholder="Enter Order Id" {...register("title")} />

        <button type="submit"className="btn bg-priceText text-white py-2 px-4 ">Search</button>
      </form>
   <div className="flex justify-between gap-4 font-sans border border-borderColor p-4 rounded-lg">
<TrackItem information_name={"Estimated Delivery time:"} information={"24 Nov 2022"}/>
<TrackItem information_name={"Shipping By:"} information={ 
    <p className="text-heading font-sans text-base"> BLUEDART,| <PhoneEnabledIcon /> +1598759364
    </p>

  }/>
<TrackItem information_name={"Status:"} information={"Picked by the currier"}/>
<TrackItem information_name={"Tracking#:"} information={"BD04535352345"}/>
</div>
<div className="w-full py-12">
<CustomizedSteppers orderid={orderId}/>
</div>

<div className="flex justify-between gap-4 font-sans border border-borderColor p-4">
  {
    Track.map(item => (
      <HighLightedProductsCard key={item._id} content={item} />
    ))
  }
</div>
<Link to="/"><BackToOrderBtn title={"Back To Order"}/>
</Link>
</ContainerMax>
</div>
</ContainerFull>
    );
};

export default TrackOrder;