import Divider from "@mui/material/Divider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useGetRequest from "../../../../hooks/useGetRequest";
const Orders = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data } = useGetRequest("orders", "order/orders");
  console.log(data);
  return (
    <>
      <div className="p-2">
        <div className="shadow-md rounded-md p-2 md:p-5">
          <h2 className="dashboard-title">Orders</h2>
          <Divider />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          soluta eveniet ipsam eaque, deleniti explicabo. Quis sit quaerat amet,
          laboriosam, cum suscipit dolor dignissimos nisi id velit dicta,
          corrupti adipisci!
        </div>
      </div>
    </>
  );
};

export default Orders;
