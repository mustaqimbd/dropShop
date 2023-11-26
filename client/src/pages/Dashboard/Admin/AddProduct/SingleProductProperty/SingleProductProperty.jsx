import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGetRequest from "../../../../../hooks/useGetRequest";

const SingleProductProperty = ({
  setProductProperties,
  productProperties,
  setCategory,
}) => {
  const [productCategory, setProductCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { data } = useGetRequest("categories", "category");
  const categories = data?.payload?.category || [];
  const handleChange = event => {
    setProductCategory(event?.target?.value);
    const findCategory = categories.find(
      category => category._id === event?.target?.value
    );
    setSelectedCategory(findCategory);
    setCategory([findCategory?.name, findCategory?.slug]);
    setProductProperties([]);
  };
  // console.log(selectedCategory);
  const handlePropsChange = (propsName, event) => {
    const anotherFields = productProperties?.filter(
      props => props.name !== propsName
    );
    const newProps = {
      name: propsName,
      value: event.target.value,
    };
    setProductProperties([...anotherFields, newProps]);
  };
  return (
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
      <div className="mt-5 grid grid-cols-2 gap-5 w-full">
        {selectedCategory?.properties?.map(categoryProps => (
          <FormControl fullWidth key={categoryProps._id}>
            <InputLabel id={categoryProps._id} className="capitalize">
              {categoryProps?.propertyName}
            </InputLabel>
            <Select
              labelId={categoryProps._id}
              value={
                productProperties.find(
                  props => props.name === categoryProps?.propertyName
                )?.value || "Please select"
              }
              label={categoryProps?.propertyName}
              onChange={event =>
                handlePropsChange(categoryProps?.propertyName, event)
              }
            >
              <MenuItem value="Please select" disabled>
                Please select
              </MenuItem>
              {categoryProps?.values?.map(values => (
                <MenuItem key={values} value={values}>
                  {values}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </div>
    </div>
  );
};

export default SingleProductProperty;
