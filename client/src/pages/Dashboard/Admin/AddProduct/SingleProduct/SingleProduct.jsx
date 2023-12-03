import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef, useState } from "react";
import SingleProductProperty from "../SingleProductProperty/SingleProductProperty";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import JoditEdit from "../../../../../components/JoditEdit/JoditEdit";

const SingleProduct = () => {
  const [images, setImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productProperties, setProductProperties] = useState([]);
  const [category, setCategory] = useState("");
  const [isHot, setIsHot] = useState("yes");
  const [description, setDescription] = useState("");
  const addBtnRef = useRef();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    data.images = uploadImages;
    data.properties = productProperties;
    data.category = category;
    data.description = description;
    data.hot = data?.hot === "yes" ? true : false;
    console.log(data);
    try {
      const res = await axiosSecure.post("/api/admin/add-product", data);
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong try again later.");
    }
    console.log(data);
  };
  const handleImageChange = e => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);
  };
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
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
          formData
        )
      );
    }
    try {
      const responses = await Promise.all(promises);
      const imgUrls = responses.map(response => response.data.data.display_url);
      setUploadImages(imgUrls);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <h2 className="dashboard-title">Add product</h2>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full mt-4 space-x-4">
          <div className="flex-1">
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
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
              fullWidth
              {...register("quantity", { required: true })}
            />
            {errors.quantity?.type === "required" && (
              <p role="alert" className="text-red-600 font-bold">
                This field is required
              </p>
            )}
          </div>
        </div>
        <SingleProductProperty
          setProductProperties={setProductProperties}
          productProperties={productProperties}
          setCategory={setCategory}
        />
        <div className="flex w-full mt-4 space-x-4">
          <div className="flex-1">
            <TextField
              id="outlined-basic"
              label="Reseller price"
              variant="outlined"
              type="number"
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
              fullWidth
              {...register("warranty", { required: true })}
            />
            {errors.warranty?.type === "required" && (
              <p role="alert" className="text-red-600 font-bold">
                This field is required
              </p>
            )}
          </div>
        </div>{" "}
        <div className="flex w-full mt-4 space-x-4">
          <div className="flex-1">
            <TextField
              id="outlined-basic"
              label="Ratings (1-5)"
              variant="outlined"
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
              fullWidth
              {...register("discount", { required: true })}
            />
            {errors.discount?.type === "required" && (
              <p role="alert" className="text-red-600 font-bold">
                This field is required
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full mt-4 space-x-4">
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel id="is-hot">Is hot</InputLabel>
              <Select
                labelId="is-hot"
                id="is-hot-select"
                value={isHot}
                label="Is hot"
                {...register("hot", { required: true })}
                onChange={event => setIsHot(event?.target?.value)}
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
        </div>
        <div className="mt-4">
          <h2 className="m-2 font-bold text-md">Product description</h2>
          <JoditEdit value={description} setValue={setDescription} />
        </div>
        <button type="submit" className="hidden" ref={addBtnRef}></button>
      </form>

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
            variant="outlined"
            color="primary"
            onClick={uploadImages2}
            startIcon={<CloudUploadIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <Button
          component="span"
          variant="contained"
          color="primary"
          onClick={() => addBtnRef.current.click()}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default SingleProduct;
