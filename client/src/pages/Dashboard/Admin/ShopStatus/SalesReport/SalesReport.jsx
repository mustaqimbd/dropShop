import useGetRequest from "../../../../../hooks/useGetRequest";
import Divider from "@mui/material/Divider";

const SalesReport = () => {
  const dailySalesReport = useGetRequest(
    "daily-sales",
    "admin/dashboard/daily-sales"
  );
  console.log(dailySalesReport);
  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-1 md:col-span-2 shadow-md p-2 md:p-5 rounded-lg">
          <h2 className="dashboard-title">Sales report</h2>
          <Divider />
          <div></div>
        </div>
        <div className="col-span-1">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam!
            Similique animi illum et omnis, nulla harum asperiores quis
            voluptatem facere, quae magni natus magnam, mollitia dignissimos.
            Consectetur, delectus sapiente?
          </p>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
