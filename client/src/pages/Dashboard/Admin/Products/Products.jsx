import { Button, Divider, TextField } from "@mui/material";
import AdminProductPageBody from "./AdminProductPageBody";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";

const Products = () => {
  const [searchProduct, setSearchProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const handleProductSearch = async event => {
    event.preventDefault();
    setErrorMessage("");
    setSearchProduct({});
    const productId = event.target.searchId.value;
    try {
      const res = await axiosSecure.get(
        `api/admin/dashboard/product-by-id?productId=${productId}`
      );
      setSearchProduct(res?.data);
    } catch (error) {
      setSearchProduct(error?.response?.data);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  console.log(searchProduct);
  console.log(errorMessage);
  return (
    <>
      <div className="bg-white shadow-md p-2 md:p-5">
        <h2 className="dashboard-title">All products</h2>
        <Divider />
        <div className="py-5">
          <form
            className="max-w-md flex gap-4 items-end"
            onSubmit={handleProductSearch}
          >
            <TextField
              name="searchId"
              label="Search product"
              variant="standard"
              className="flex-1"
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </form>
          <h2 className="font-bold text-hotBadge mt-3">{errorMessage}</h2>
        </div>
        <AdminProductPageBody />
      </div>
    </>
  );
};

export default Products;
