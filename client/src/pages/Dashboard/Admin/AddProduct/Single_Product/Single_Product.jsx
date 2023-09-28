import { Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Product_Property from "../Single_Product_Property/Product_Property";
const Single_Product = () => {
const [productName, setProductName] = useState("");
const [images, setImages] = useState([]);
const [uploadImages, setUploadImages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const[sku,setSku]=useState();
const[stockQt,setStockQt]=useState();
const[mxProfit,setMxProfit]=useState();
const[exProfit,setExProfit]=useState();
const[rgPrice,setRgprice]=useState();
const[discount,setDiscount]=useState();

const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...images, ...selectedFiles]); // Append newly selected files to the existing images array
  };

  const uploadImages2 = async () => {
    setIsLoading(true);

    const formData = new FormData();
    
    // Append all selected images to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append(`images${[i]}`, images[i]);
    }

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=8a8e09745fed1087c15b0a94ab84b2a4",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUploadImages(data.data);
        console.log(uploadImages);
      } else {
        alert("Image upload failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Typography variant="h4">Add Product</Typography>

      <div className="flex w-full mt-4 space-x-4">
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Product Name"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="SKU"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Stock Quantity"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={stockQt}
            onChange={(e) => setStockQt(e.target.value)}
          />
        </div>
      </div>
      <Product_Property/>

      <div className="flex w-full mt-4 space-x-4">
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Maximum Profit Margin"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={mxProfit}
            onChange={(e) => setMxProfit(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Extra Profit Margin"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={exProfit}
            onChange={(e) => setExProfit(e.target.value)}
          />
        </div>
</div>
     
<div className="flex w-full mt-4 space-x-4">
        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Product Regular Price"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={rgPrice}
            onChange={(e) => setRgprice(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <TextField
            id="outlined-basic"
            label="Discount Price"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
</div>
     
     <div className="mt-4">
     <TextField
            id="outlined-basic"
            label="Short Description"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            multiline
          rows={4}
          />
     </div>
     
     <div className="my-4">
     <TextField
            id="outlined-basic"
            label="Additional Information"
            variant="outlined"
            fullWidth // Ensure the input takes up full width
            multiline
          rows={4}
          />
     </div>
     
     
     
     
     
      <div className="space-y-4">
        <input
          type="file"
          multiple
          className="text-primary"
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

      <div>
        <Button
          component="span"
          variant="contained"
          color="primary"
          // Add your click handler function here
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default Single_Product;
