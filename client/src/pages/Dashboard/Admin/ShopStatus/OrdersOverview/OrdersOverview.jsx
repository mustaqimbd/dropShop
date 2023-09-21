import { Divider } from "@mui/material";
import useGetRequest from "../../../../../hooks/useGetRequest";
import { Pie, PieChart, Tooltip } from "recharts";

const OrdersOverview = () => {
  const ordersOverviewData = useGetRequest(
    "Orders overview",
    "admin/dashboard/order-overview"
  );
  const data = ordersOverviewData?.data?.payload?.orderOverview.map(item => {
    return {
      name: item._id,
      value: item.count,
    };
  });

  return (
    <>
      <h2 className="dashboard-title text-center">Sales report</h2>
      <Divider />
      <div className="flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </>
  );
};

export default OrdersOverview;
