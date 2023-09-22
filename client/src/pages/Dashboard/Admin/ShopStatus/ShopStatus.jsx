import NewCustomersAndTopProducts from "./NewCustomersAndTopProducts/NewCustomersAndTopProducts";
import RecentOrders from "./RecentOrders/RecentOrders";
import SalesReportAndOrderOverview from "./SalesReportAndOrderOverview/SalesReportAndOrderOverview";
import ShopStats from "./ShopStats/ShopStats";

const ShopStatus = () => {
  return (
    <>
      <ShopStats />
      <SalesReportAndOrderOverview />
      <RecentOrders />
      <NewCustomersAndTopProducts />
    </>
  );
};

export default ShopStatus;
