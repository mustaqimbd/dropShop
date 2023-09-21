import AreaCharts from "../../../../../../components/AreaCharts/AreaCharts";
import useGetRequest from "../../../../../../hooks/useGetRequest";

const Todays = () => {
  const dailySalesReport = useGetRequest(
    "daily-sales",
    "admin/dashboard/daily-sales"
  );
  const data = dailySalesReport?.data?.payload?.sales;
  return (
    <>
      <AreaCharts data={data} xAxis="_id" area="total_sales" />
    </>
  );
};

export default Todays;
