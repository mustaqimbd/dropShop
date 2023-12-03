import OrdersOverview from "./OrdersOverview/OrdersOverview";
import SalesReport from "./SalesReport/SalesReport";

const SalesReportAndOrderOverview = () => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden pb-2">
      <div className="col-span-1 md:col-span-2 shadow-md p-2 md:p-5 rounded-lg bg-white">
        <SalesReport />
      </div>
      <div className="col-span-1 shadow-md p-2 md:p-5 rounded-lg bg-white">
        <OrdersOverview />
      </div>
    </div>
  );
};

export default SalesReportAndOrderOverview;
