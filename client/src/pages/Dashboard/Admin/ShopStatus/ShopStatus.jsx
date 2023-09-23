import NewCustomersAndTopProducts from "./NewCustomersAndTopProducts/NewCustomersAndTopProducts";
import ProductStatisticsAndTopCategories from "./ProductStatisticsAndTopCategories/ProductStatisticsAndTopCategories";
import RecentOrders from "./RecentOrders/RecentOrders";
import SalesReportAndOrderOverview from "./SalesReportAndOrderOverview/SalesReportAndOrderOverview";
import ShopStats from "./ShopStats/ShopStats";

const ShopStatus = () => {
  return (
    <>
      <ShopStats />
      <SalesReportAndOrderOverview />
      <RecentOrders />
      <ProductStatisticsAndTopCategories />
      <NewCustomersAndTopProducts />
    </>
  );
};

export default ShopStatus;
