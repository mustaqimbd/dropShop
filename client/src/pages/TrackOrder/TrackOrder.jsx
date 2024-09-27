import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import TrackSingleOrder from "../../components/TrackSingleOrder/TrackSingleOrder";
const TrackOrder = () => {
  const [searchOrder, setSearchOrder] = useState([]);
  const [isNoOrderFound, setIsNoOrderFound] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const handleSearch = async event => {
    event.preventDefault();
    setIsNoOrderFound("");
    const trackId = event.target.searchId.value;
    if (!trackId) {
      setSearchOrder([]);
      return toast.error("Please enter a valid order id.");
    }
    try {
      const res = await axiosSecure.get(
        `/order/track-order?orderId=${trackId}`
      );
      setSearchOrder(res.data.payload.orderDetails);
      if (!res.data.payload.orderDetails.length) {
        setIsNoOrderFound(true);
      }
    } catch (error) {
      setSearchOrder([]);
    }
  };
  return (
    <ContainerFull>
      <div className="py-5 ">
        <ContainerMax>
          <form className="py-5 flex gap-2" onSubmit={handleSearch}>
            <input
              type="text"
              className="py-2 px-2 ring-1 outline-none"
              id="title"
              placeholder="Enter order id"
              name="searchId"
            />

            <Button type="submit" variant="contained">
              Search
            </Button>
          </form>
          {isNoOrderFound ? (
            <h2 className="font-bold text-sm text-hotBadge">
              No order found with this order id.
            </h2>
          ) : (
            ""
          )}

          {searchOrder.length ? (
            <TrackSingleOrder orderDetails={searchOrder[0]} />
          ) : (
            <h2 className="font-bold text-xl text-center text-caption py-10">
              Enter your order id to track your order.
            </h2>
          )}
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default TrackOrder;
