import ProductStatisticsAndTopCategories from "./ProductStatisticsAndTopCategories/ProductStatisticsAndTopCategories";
import RecentOrders from "./RecentOrders/RecentOrders";
import SalesReportAndOrderOverview from "./SalesReportAndOrderOverview/SalesReportAndOrderOverview";
import ShopStats from "./ShopStats/ShopStats";
import TopSellersAndTopProducts from "./TopSellersAndTopProducts/TopSellersAndTopProducts";

const ShopStatus = () => {
  return (
    <>
      <ShopStats />
      <SalesReportAndOrderOverview />
      <RecentOrders />
      <ProductStatisticsAndTopCategories />
      <TopSellersAndTopProducts />
    </>
  );
};

export default ShopStatus;
