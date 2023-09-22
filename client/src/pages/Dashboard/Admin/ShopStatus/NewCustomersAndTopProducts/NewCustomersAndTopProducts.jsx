import NewCustomers from "./NewCustomers/NewCustomers";
import TopProducts from "./TopProducts/TopProducts";

const NewCustomersAndTopProducts = () => {
  return (
    <div className="grid md:grid-cols-5 mt-5 gap-5 mx-2 w-full">
      <div className="col-span-1 md:col-span-2 shadow-md rounded-md p-2 md:p-5 bg-white">
        <NewCustomers />
      </div>
      <div className="col-span-1 md:col-span-3 shadow-md rounded-md p-2 md:p-5 bg-white">
        <TopProducts />
      </div>
    </div>
  );
};

export default NewCustomersAndTopProducts;
