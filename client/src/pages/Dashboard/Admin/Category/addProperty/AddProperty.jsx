import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";
import useGetRequest from "../../../../../hooks/useGetRequest";

import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddProperty = () => {
  //load the category data
  const [axiosSecure] = useAxiosSecure();

  const { data } = useGetRequest("", "category");
  const categories = data?.payload?.category || [];

  const [categoryId, setCategoryID] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [propertyValues, setPropertyValues] = useState([""]); //array of property values

  console.log(
    "categoryName:",
    categoryId,
    "propertyName:",
    propertyName,
    "Property values ",
    propertyValues
  );

  console.log(properties);

  const handleCategoryChange = (event) => {
    setCategoryID(event.target.value);
  };

  const handleRemoveProperty = (index) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  const handleAddValue = () => {
    setPropertyValues([...propertyValues, ""]);
  };

  const handleRemoveValue = (index) => {
    const updatedValues = [...propertyValues];
    updatedValues.splice(index, 1);
    setPropertyValues(updatedValues);
  };

  const handleValueChange = (index, newValue) => {
    const updatedValues = [...propertyValues];
    updatedValues[index] = newValue;
    setPropertyValues(updatedValues);
  };

  const handleSaveData = async () => {
    const categoryData = {
      propertyName,
      values: propertyValues,
    };
    // Do something with the organizedData, e.g., send it to an API or perform other actions
    axiosSecure
      .put(`/api/category/${categoryId}`, categoryData, {
        headers: {
          "Content-Type": "application/json", // Specify the content type
          // Add any additional headers if needed
        },
      })
      .then((response) => {
        console.log("Category updated:", response.data);

        setProperties([]);
        setPropertyName("");
        setPropertyValues([]);
        setCategoryID("");
        toast.success(`${response?.data?.message}`, {
          style: {
            border: "1px solid green",
          },
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });

    console.log(categoryData);
  };

  return (
    <Paper>
      <div className="p-4">
        <FormControl className="w-full mb-4">
          <InputLabel>Select Category</InputLabel>
          <Select value={categoryId} onChange={handleCategoryChange}>
            <MenuItem value="">Select</MenuItem>
            {categories?.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
            {/* Add more categories as needed */}
          </Select>
        </FormControl>

        <Grid s marginY={1} container spacing={2} alignItems="start">
          <Grid item xs={12} md={6}>
            <TextField
              label="Property Name"
              variant="outlined"
              fullWidth
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
            <div className="mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSaveData()}
              >
                Save Data
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {propertyValues?.map((value, index) => (
              <div key={index} className="flex  items-center space-x-2">
                <TextField
                  margin="dense"
                  label="Property Value"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                />
                {index === propertyValues?.length - 1 && (
                  <IconButton color="primary" onClick={handleAddValue}>
                    <AddIcon />
                  </IconButton>
                )}
                {index !== propertyValues?.length - 1 && (
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveValue(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </Grid>
        </Grid>

        <div className="mt-4">
          {properties.map((property, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <div>{`${property.name}: ${property.values.join(", ")}`}</div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveProperty(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default AddProperty;
