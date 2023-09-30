import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { format, parseISO } from "date-fns";

const SingleOrderDetails = () => {
  const { id: orderId } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const [singleOrderLoading, setSingleOrderLoading] = useState(false);
  const { data: orderData = {} } = useQuery({
    queryKey: ["single-order"],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get(
          `/api/order/track-order?orderId=${orderId}`
        );
        setSingleOrderLoading(false);

        return result;
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setSingleOrderLoading(false);
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
        <div className="mt-5 overflow-auto p-1">
          <div className="flex justify-around flex-wrap gap-5">
            <div className="w-64 ring-1 ring-slate-300 rounded-lg overflow-hidden">
              <h2 className="bg-slate-100 text-center py-2 text-caption font-bold text-lg">
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
              <h2 className="bg-slate-100 text-center py-2 text-caption font-bold text-lg">
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
              <h2 className="bg-slate-100 text-center py-2 text-caption font-bold text-lg">
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
              <h2 className="bg-slate-100 text-center py-2 text-caption font-bold text-lg">
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
        </div>
      </div>
    </>
  );
};

export default SingleOrderDetails;
