import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UpdatePage from "./UpdatePage";

const UpdateProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [searchedProduct, setSearchedProduct] = useState(null);

  const handleSearch = async () => {
    if (!searchValue) {
      toast.error("Please check the product id again.");
    }
    try {
      const result = await axiosSecure(
        `/api/admin/dashboard/product-by-id?productId=${searchValue}`
      );
      setSearchedProduct(result?.data?.payload?.singleProduct);
    } catch (error) {
      setSearchedProduct(null);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md p-2 md:p-5 rounded-md">
        <h2 className="dashboard-title">Update products</h2>
        <Divider />
        <div className="mt-5 flex justify-start">
          <div className="flex gap-5 items-center">
            <TextField
              id="standard-basic"
              label="Search by id"
              variant="standard"
              onChange={event => setSearchValue(event.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        {searchedProduct ? (
          <UpdatePage
            searchedProduct={searchedProduct}
            handleSearch={handleSearch}
          />
        ) : (
          <h2 className="text-red-600 font-bold mt-2">{errorMessage}</h2>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
