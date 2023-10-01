import { Divider } from "@mui/material";
import ProductsStatistics from "./ProductsStatistics/ProductsStatistics";
import TopCategories from "./TopCategories/TopCategories";

const ProductStatisticsAndTopCategories = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
        <div className="col-span-1 md:col-span-2 bg-white rounded-md shadow-md p-2 md:p-5">
          <TopCategories />
        </div>
        <div className="bg-white rounded-md shadow-md p-2 md:p-5">
          <h2 className="dashboard-title">Product statistics</h2>
          <Divider />
          <ProductsStatistics />
        </div>
      </div>
    </>
  );
};

export default ProductStatisticsAndTopCategories;
