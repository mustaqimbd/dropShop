import { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FiltereByPrice = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]); // Set initial min and max values here

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinPriceInputChange = (event) => {
    const minValue = event.target.value === "" ? 0 : Number(event.target.value);
    setPriceRange([minValue, priceRange[1]]);
  };

  const handleMaxPriceInputChange = (event) => {
    const maxValue = event.target.value === "" ? 0 : Number(event.target.value);
    setPriceRange([priceRange[0], maxValue]);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div>
        <Typography gutterBottom>Price Range</Typography>
        <Grid item xs={4}>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            min={0}
            max={1000} // Set your desired max price here
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Min Price"
              type="number"
              value={priceRange[0]}
              onChange={handleMinPriceInputChange}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              size="small"
              label="Max Price"
              type="number"
              value={priceRange[1]}
              onChange={handleMaxPriceInputChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

//filtered By rating

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function FilterByRating() {
  const [value, setValue] = useState(2);

  return (
    <div className="bg-white p-4 rounded-md">
      <div>
        <Typography>Select Rating</Typography>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    </div>
  );
}

//filter by multiple checkbox

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterByCheckbox = ({ title, options }) => {
  const [selectedValues, setSelectedValues] = useState([]); // State to store selected values
  const [isExpanded, setIsExpanded] = useState(true); // State to track expanded/collapsed state

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((val) => val !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
  };

  const toggleExpand = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="">
        <div
          onClick={toggleExpand}
          className="flex cursor-pointer justify-between items-center"
        >
          <Typography gutterBottom>{title}</Typography>{" "}
          <span className="text-xl">
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        </div>
        {isExpanded && (
          <div>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedValues.includes(option.value)}
                      onChange={handleCheckboxChange}
                      value={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            <Typography gutterBottom>
              Selected Values: {selectedValues.join(", ")}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export { FiltereByPrice, FilterByRating, FilterByCheckbox };
