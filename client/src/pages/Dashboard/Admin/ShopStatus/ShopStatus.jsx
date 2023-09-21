import RecentOrders from "./RecentOrders/RecentOrders";
import SalesReport from "./SalesReport/SalesReport";
import ShopStats from "./ShopStats/ShopStats";

const ShopStatus = () => {
  return (
    <>
      <ShopStats />
      <SalesReport />
      <RecentOrders />
    </>
  );
};

export default ShopStatus;
