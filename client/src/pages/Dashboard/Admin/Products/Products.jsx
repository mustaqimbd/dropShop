import { Button, Divider, TextField } from "@mui/material";
import AdminProductPageBody from "./AdminProductPageBody";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import ProductsModal from "./ProductsModal";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const handleProductSearch = async event => {
    event.preventDefault();
    setErrorMessage("");
    setSearchProduct({});
    if (event.target.searchId.value === "") return;
    const productId = event.target.searchId.value;
    try {
      const res = await axiosSecure.get(
        `api/admin/dashboard/product-by-id?productId=${productId}`
      );
      setErrorMessage("");
      setSearchProduct(res?.data);
      setOpen(true);
    } catch (error) {
      setSearchProduct({});
      setErrorMessage(error?.response?.data?.message);
    }
  };
  const swalWithCustomButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "py-1 px-4 bg-red-700 text-white font-bold rounded-md  ml-5",
      cancelButton: "py-1 px-4 bg-green-700 text-white font-bold rounded-md",
    },
    buttonsStyling: false,
  });
  const handleDelete = id => {
    swalWithCustomButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async result => {
        if (result.isConfirmed) {
          try {
            await axiosSecure.delete(
              `/admin/dashboard/delete-product?product_id=${id}`
            );
            swalWithCustomButtons.fire(
              "Deleted!",
              "Product has been deleted.",
              "success"
            );
          } catch (error) {
            console.log(error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithCustomButtons.fire(
            "Cancelled",
            "Your imaginary product is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <>
      <div className="bg-white shadow-md p-2 md:p-5 rounded-md">
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
        <AdminProductPageBody handleDelete={handleDelete} />
      </div>
      {searchProduct?.success ? (
        <ProductsModal
          searchProduct={searchProduct}
          setOpen={setOpen}
          open={open}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Products;
