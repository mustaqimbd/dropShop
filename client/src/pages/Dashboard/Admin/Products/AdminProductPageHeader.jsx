import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const AdminProductPageHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-gray-600 font-semibold">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
        <Stack spacing={2} direction="row" alignItems={"center"}>
          <Link to={"/dashboard/admin/status"}>
            <Button variant="contained">Home</Button>
          </Link>
          <ArrowForwardIosIcon />
          <p className="text-base">Products</p>
        </Stack>
        <div className="flex md:justify-end ">
          <Button variant="contained">Add Product</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPageHeader;
