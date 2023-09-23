import { Divider } from "@mui/material";

const ProductStatisticsAndTopCategories = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mx-2 gap-5">
        <div className="col-span-1 md:col-span-2 bg-white rounded-md shadow-md p-2 md:p-5">
          <h2 className="dashboard-title">Top categories</h2>
          <Divider />
        </div>
        <div className="bg-white rounded-md shadow-md p-2 md:p-5">
          <h2 className="dashboard-title">Product statistics</h2>
          <Divider />
        </div>
      </div>
    </>
  );
};

export default ProductStatisticsAndTopCategories;
