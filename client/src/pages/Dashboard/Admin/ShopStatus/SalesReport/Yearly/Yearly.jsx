import useGetRequest from "../../../../../../hooks/useGetRequest";
import AreaCharts from "../../../../../../components/AreaCharts/AreaCharts";

const Yearly = () => {
  const yearlySales = useGetRequest(
    "Yearly sales",
    "admin/dashboard/yearly-sales"
  );
  const data = yearlySales?.data?.payload?.sales;
  return (
    <>
      <AreaCharts data={data} xAxis="_id" area="total_sales" />
    </>
  );
};

export default Yearly;
