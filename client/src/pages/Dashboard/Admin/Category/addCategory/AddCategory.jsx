import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const AddCategory = () => {
  const [axiosSecure] = useAxiosSecure();
  //form

  const [categoryName, setCategoryName] = useState("");
  const [previewIcon, setPreviewIcon] = useState(null);
  const [iconImage, setIconImage] = useState(null);

  const handleCategoryNameChange = event => {
    setCategoryName(event.target.value);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    setIconImage(file);
    if (file) {
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append("image", iconImage);

    if (categoryName && previewIcon) {
      //add the category post to server
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          params: {
            key: `${import.meta.env.VITE_IMGBB}`, // Replace with your ImgBB API key
          },
        }
      );
      const imageUrl = response.data.data.url;
      //post the data to backend
      axiosSecure
        .post("/api/category/", {
          name: categoryName,
          img: imageUrl,
        })
        .then(function (response) {
          if (response.status == 200) {
            toast.success(`${response?.data?.message}`, {
              style: {
                border: "1px solid green",
              },
              position: "top-center",
            });

            setCategoryName("");
            setIconImage("");
            setPreviewIcon("");
          }
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  return (
    <Paper elevation={3} className="p-4 space-y-4">
      <Toaster />
      <Typography variant="h6">Add Category</Typography>
      <TextField
        label="Category Name"
        variant="outlined"
        fullWidth
        value={categoryName}
        onChange={handleCategoryNameChange}
      />
      <div className="space-y-2 ">
        <div className="flex justify-start gap-6 items-center">
          <input
            type="file"
            accept="image/*"
            id="icon-upload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="icon-upload">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
            </Button>
          </label>
          <div>
            {previewIcon && (
              <img
                src={previewIcon}
                alt="Category Icon Preview"
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
            )}
          </div>
          <div>
            {previewIcon && (
              <Tooltip title="Remove Icon">
                <IconButton
                  onClick={() => setPreviewIcon(null)}
                  disabled={false}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default AddCategory;
