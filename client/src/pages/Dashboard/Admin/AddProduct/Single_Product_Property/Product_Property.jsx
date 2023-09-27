import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGetRequest from "../../../../../hooks/useGetRequest";
import { Button, TextField } from "@mui/material";

import './Product_property.css';
const Product_Property = () => {
  const [productCategory, setProductCategory] = useState("");
  const [property, setProperty] = useState("");
  const [propertyValues, setPropertyValues] = useState([""]);


  const handleChange = (event) => {
    setProductCategory(event.target.value);

  };


  const { data } = useGetRequest("", "category");
  const categories = data?.payload?.category || [];
  console.log(categories);
  

  return (
    <div className="flex-1 ">
      <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Select Category"
            onChange={handleChange}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex gap-4 mt-4 items-center">
      <div className="flex-1">
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Property Name</InputLabel>

          <Select
          fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Property Name"
            onChange={handleChange}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>
        
        <div className="flex-1">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Property Value</InputLabel>
        <Select
          fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Property Value"
            onChange={handleChange}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>

        <div className="flex-1">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="full-height-button" // Add a custom CSS class for the button
          >
            Add Property
          </Button>
        </div>
      </div>
    
    </div>
  );
};

export default Product_Property;
