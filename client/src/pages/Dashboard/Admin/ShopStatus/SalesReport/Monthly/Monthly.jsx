import useGetRequest from "../../../../../../hooks/useGetRequest";
import AreaCharts from "../../../../../../components/AreaCharts/AreaCharts";

const Monthly = () => {
  const currentMonthSales = useGetRequest(
    "Monthly-sales",
    "admin/dashboard/current-month-sales"
  );
  const data = currentMonthSales?.data?.payload?.sales;
  return (
    <>
      <AreaCharts data={data} xAxis="_id" area="totalSales" />
    </>
  );
};

export default Monthly;
