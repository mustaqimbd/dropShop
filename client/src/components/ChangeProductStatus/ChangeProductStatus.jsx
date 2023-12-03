import { MenuItem, Select } from "@mui/material";

const ChangeProductStatus = ({ value, handleChange }) => {
  return (
    <Select
      value={value}
      label="Status"
      onChange={handleChange}
      style={{ width: "300px" }}
    >
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="processing">Processing</MenuItem>
      <MenuItem value="picked by currier">Picked by currier</MenuItem>
      <MenuItem value="shifted">Shifted</MenuItem>
      <MenuItem value="completed">Completed</MenuItem>
      <MenuItem value="canceled">Canceled</MenuItem>
    </Select>
  );
};

export default ChangeProductStatus;
