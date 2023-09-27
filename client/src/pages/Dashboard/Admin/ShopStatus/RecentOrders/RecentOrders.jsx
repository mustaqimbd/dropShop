import {
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import useRecentOrder from "../../../../../hooks/useRecentOrder";
import useGetRequest from "../../../../../hooks/useGetRequest";

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { recentOrders } = useRecentOrder(currentPage);
  const totalOrders = useGetRequest(
    "totalOrders",
    "admin/dashboard/total-orders"
  );
  const totalPage = Math.ceil(totalOrders?.data?.payload?.totalOrderCount / 5);
  const rows = recentOrders?.payload?.orders;

  const handleCurrentPage = increase => {
    if (increase) {
      if (currentPage == totalPage - 1) {
        return;
      }
      return setCurrentPage(currentPage + 1);
    } else {
      if (currentPage < 1) {
        return;
      }
      return setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <div className="shadow-md rounded-md p-2 md:p-5 mx-2 mt-5 bg-white">
        <h2 className="dashboard-title">Recent orders </h2>
        <Divider style={{ marginBottom: "20px" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map(row => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id.slice(row._id.length - 10)}
                  </TableCell>
                  <TableCell align="left">
                    {row.product_name.length > 30
                      ? row.product_name.slice(0, 30) + "..."
                      : row.product_name}
                  </TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">$ {row.total_price}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.status}
                      style={{
                        background: `${
                          row.status === "completed"
                            ? "#29cc97"
                            : row.status === "pending"
                            ? "#fec400"
                            : row.status === "on the way"
                            ? "#4c84ff"
                            : row.status === "canceled"
                            ? "#fe5461"
                            : ""
                        }`,
                        color: "#fff",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
          <div className="py-3 flex justify-end mr-10 gap-3 items-center">
            <div>
              {recentOrders?.payload?.skip ? (
                <span>{recentOrders?.payload?.skip + 1}</span>
              ) : (
                "0"
              )}{" "}
              {" - "}
              {recentOrders?.payload?.skip + recentOrders?.payload?.limit ? (
                <span>
                  {recentOrders?.payload?.skip + recentOrders?.payload?.limit}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleCurrentPage(false)}
                disabled={currentPage < 1}
                className={`w-7 h-7  rounded-full  ${
                  currentPage < 1
                    ? " text-gray-500 bg-gray-200"
                    : "text-gray-700 bg-gray-300"
                }`}
              >
                <KeyboardArrowLeftIcon />
              </button>
              <button
                onClick={() => handleCurrentPage(true)}
                disabled={currentPage == totalPage - 1}
                className={`w-7 h-7 bg-gray-300 rounded-full  ${
                  currentPage == totalPage - 1
                    ? " text-gray-500 bg-gray-200"
                    : "text-gray-700 bg-gray-300"
                }`}
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default RecentOrders;
