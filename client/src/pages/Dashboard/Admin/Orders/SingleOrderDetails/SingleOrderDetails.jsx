import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { format, parseISO } from "date-fns";
import OrderedProductsTable from "./OrderedProductsTable";
import TrackSingleOrder from "../../../../../components/TrackSingleOrder/TrackSingleOrder";

const SingleOrderDetails = () => {
  const { id: orderId } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const { data: orderData = {}, isLoading: singleOrderLoading } = useQuery({
    queryKey: ["single-order"],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get(
          `/api/order/track-order?orderId=${orderId}`
        );

        return result;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  const singleOrder = orderData?.data?.payload?.orderDetails
    ? orderData?.data?.payload?.orderDetails[0]
    : undefined;

  if (singleOrderLoading) {
    return <h2 className="text-center font-bold mt-20">Loading...</h2>;
  }
  if (!singleOrder) {
    return (
      <h2 className="text-center font-bold mt-20">
        No order found with this id.
      </h2>
    );
  }
  return (
    <>
      <div className="mx-2 bg-white shadow-md p-2 md:p-5 mt-10 rounded-md mb-5">
        <div className="flex justify-between">
          <h2 className="dashboard-title">Order Details</h2>
          <h2 className="dashboard-title">Order ID: {singleOrder?.order_id}</h2>
        </div>
        <Divider />
        <div className="mt-5  p-1 overflow-hidden">
          <div className="flex justify-around flex-wrap gap-5">
            <div className="w-64 ring-1 ring-slate-300 rounded-lg overflow-hidden">
              <h2 className="bg-primary/40 text-center py-2 text-caption font-bold text-lg">
                Seller info
              </h2>
              <Divider />
              <div className="p-5">
                <h2 className="text-caption font-bold text-lg">
                  {singleOrder?.seller_info[0]?.name}
                </h2>
                <p className="text-caption font-semibold text-sm">
                  {singleOrder?.seller_info[0]?.email}
                </p>
              </div>
            </div>
            <div className="w-64 ring-1 ring-slate-300 rounded-lg overflow-hidden">
              <h2 className="bg-primary/40 text-center py-2 text-caption font-bold text-lg">
                Customer info
              </h2>
              <Divider />
              <div className="p-5">
                <h2 className="text-caption font-bold text-lg">
                  {singleOrder?.customer_info[0]?.name}
                </h2>
                <p className="text-caption font-semibold text-sm">
                  {singleOrder?.customer_info[0]?.mobile}
                </p>
              </div>
            </div>
            <div className="w-64 ring-1 ring-slate-300 rounded-lg overflow-hidden">
              <h2 className="bg-primary/40 text-center py-2 text-caption font-bold text-lg">
                Shipped to
              </h2>
              <Divider />
              <div className="p-5">
                <h2 className="text-caption font-bold text-lg">
                  {singleOrder?.customer_info[0]?.address?.division}
                </h2>
                <p className="text-caption font-semibold text-sm">
                  {singleOrder?.customer_info[0]?.address?.district}
                </p>
              </div>
            </div>
            <div className="w-64 ring-1 ring-slate-300 rounded-lg overflow-hidden">
              <h2 className="bg-primary/40 text-center py-2 text-caption font-bold text-lg">
                Order date
              </h2>
              <Divider />
              <div className="p-5">
                <h2 className="text-caption font-bold text-lg">
                  {format(parseISO(singleOrder?.createdAt), "MMMM do, yyyy")}
                </h2>
                <p className="text-caption font-semibold text-sm">
                  {format(parseISO(singleOrder?.createdAt), "h:mm a")}
                </p>
              </div>
            </div>
          </div>
          <OrderedProductsTable orderDetails={singleOrder} />
          <TrackSingleOrder orderDetails={singleOrder} />
        </div>
      </div>
    </>
  );
};

export default SingleOrderDetails;
