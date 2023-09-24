import TopProducts from "./TopProducts/TopProducts";
import TopSellers from "./TopSellers/TopSellers";

const TopSellersAndTopProducts = () => {
  return (
    <div className="grid md:grid-cols-5 mt-5 gap-5 mx-2">
      <div className="col-span-1 md:col-span-2 shadow-md rounded-md p-2 md:p-5 bg-white">
        <TopSellers />
      </div>
      <div className="col-span-1 md:col-span-3 shadow-md rounded-md p-2 md:p-5 bg-white overflow-hidden">
        <TopProducts />
      </div>
    </div>
  );
};

export default TopSellersAndTopProducts;
