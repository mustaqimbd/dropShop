import SingleProductProperty from "../AddProduct/SingleProductProperty/SingleProductProperty";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteImages from "./deleteImages";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpdatePage = ({ searchedProduct, handleSearch }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productProperties, setProductProperties] = useState([]);
  const [category, setCategory] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const product = searchedProduct;
  // handle product update
  const onSubmit = async data => {
    data.id = product._id;
    data.hot = data.hot === "yes" ? true : false;
    data.is_active = data.is_active === "yes" ? true : false;
    try {
      await axiosSecure.put("/admin/dashboard/update-product-info", data);
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //handle image change
  const handleImageChange = e => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);
  };

  //handle image upload
  const uploadImages2 = async () => {
    setIsLoading(true);
    if (!images.length) {
      setIsLoading(false);
      return toast.error("Please select images.");
    }
    const promises = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);
      promises.push(
        axios.post(
          `${import.meta.env.VITE_IMG_BB_API_URL}?key=${import.meta.env.VITE_IMG_BB_API_KEY}`,
          formData
        )
      );
    }

    try {
      const responses = await Promise.all(promises);
      const imgUrls = responses.map(
        response => response?.data?.data?.display_url
      );
      await axiosSecure.put("/admin/dashboard/update-product-images", {
        imgUrls,
        id: product._id,
      });
      handleSearch();
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // handle category update
  const handleCategoryUpdate = async () => {
    if (!category) {
      return toast.error("Please select a category.");
    }
    try {
      const data = {
        category,
        productProperties,
        productId: product._id,
      };
      await axiosSecure.put(
        `/admin/dashboard/update-product-category`,
        data
      );
      toast.success("Product category updated successfully.");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-5">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Product Name"
            variant="outlined"
            defaultValue={product?.product_name}
            fullWidth
            {...register("product_name", { required: true })}
          />
          {errors.product_name?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Stock Quantity"
            variant="outlined"
            type="number"
            defaultValue={product?.available_quantity}
            fullWidth
            {...register("quantity", { required: true })}
          />
          {errors.quantity?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Reseller price"
            variant="outlined"
            type="number"
            defaultValue={product?.reseller_price}
            fullWidth
            {...register("reseller_price", { required: true })}
          />
          {errors.reseller_price?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="warranty in days"
            variant="outlined"
            defaultValue={product?.warranty}
            fullWidth
            {...register("warranty", { required: true })}
          />
          {errors.warranty?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Ratings (1-5)"
            variant="outlined"
            defaultValue={product?.ratings}
            fullWidth
            {...register("ratings", { required: true })}
          />
          {errors.ratings?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Discount Price"
            variant="outlined"
            type="number"
            defaultValue={product?.discount}
            fullWidth
            {...register("discount", { required: true })}
          />
          {errors.discount?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div className="flex-1">
          <FormControl fullWidth>
            <InputLabel id="is-hot">Is hot</InputLabel>
            <Select
              labelId="is-hot"
              id="is-hot-select"
              defaultValue={product?.hot ? "yes" : "no"}
              label="Is hot"
              {...register("hot", { required: true })}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.hot?.type === "required" && (
              <p role="alert" className="text-red-600 font-bold">
                This field is required
              </p>
            )}
          </FormControl>
        </div>
        <div className="flex-1">
          <FormControl fullWidth>
            <InputLabel id="is-active">Is Active</InputLabel>
            <Select
              labelId="is-active"
              id="is-active-select"
              defaultValue={product?.is_active ? "yes" : "no"}
              label="Is active"
              {...register("is_active", { required: true })}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.is_active?.type === "required" && (
              <p role="alert" className="text-red-600 font-bold">
                This field is required
              </p>
            )}
          </FormControl>
        </div>
        <div className="md:col-span-2">
          <TextField
            id="outlined-basic"
            label="Short Description"
            variant="outlined"
            defaultValue={product?.description}
            fullWidth
            multiline
            {...register("description", { required: true })}
          />
          {errors.description?.type === "required" && (
            <p role="alert" className="text-red-600 font-bold">
              This field is required
            </p>
          )}
        </div>
        <div>
          <Button
            type="submit"
            component="button"
            variant="contained"
            color="primary"
            className="!mt-5"
          >
            Update Product
          </Button>
        </div>
      </form>
      <Divider className="!mt-5" />
      <div>
        <h2 className="dashboard-title mt-5 !mb-0">
          Update category and properties
        </h2>
        <SingleProductProperty
          setProductProperties={setProductProperties}
          productProperties={productProperties}
          setCategory={setCategory}
        />
        <Button
          component="button"
          variant="contained"
          color="primary"
          className="!mt-5"
          onClick={handleCategoryUpdate}
        >
          Update category
        </Button>
      </div>
      <Divider className="!mt-5" />
      <div>
        <h2 className="dashboard-title mt-5 !mb-0">Add new images</h2>
        <div className="space-y-4">
          <input
            type="file"
            multiple
            className="text-primary mt-5"
            onChange={handleImageChange}
            placeholder="Choose Files"
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={uploadImages2}
              startIcon={<CloudUploadIcon />}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Update images"}
            </Button>
          </div>
        </div>
      </div>
      <Divider className="!mt-5" />
      <DeleteImages handleSearch={handleSearch} product={product} />
    </div>
  );
};

export default UpdatePage;
