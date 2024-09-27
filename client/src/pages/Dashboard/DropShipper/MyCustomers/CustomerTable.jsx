import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import { Divider } from "@mui/material";
import EditModal from "./EditModal";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CustomerTable = ({ data, refetch }) => {
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure()
  const rows = data;

  const customer = (data) => {
    sessionStorage.setItem(
      "Customer",
      JSON.stringify({
        customerName: data.customer_name,
        customerId: data.customer_id,
        id: data._id,
      })
    );
    navigate("/");
  };

  const resetCart = async (id) => {
    try {
      await axiosSecure.delete(`/cart/reset-cart/${id}`, {
        withCredentials: true, // Include cookies in the request
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 1100 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Customer
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Company
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Total Spend
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Number of orders
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Phone
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length < 1 ? (
            <TableRow>
              <TableCell>
                <h1 className="text-center">No customer</h1>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {rows?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-[#2DA5F3] bg-[#deebf3] w-10 h-10 p-3 flex justify-center items-center rounded-full">
                    {row.customer_name
                      ?.split(" ")
                      .map((w) => w.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>{row.customer_name}</span>
                </div>
              </TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell align="center">{row.spend} ৳</TableCell>
              <TableCell align="center">{row.orders}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-3 items-center text-white ">
                  <button
                    onClick={() => resetCart(row._id)}
                    className="bg-[#83B735] px-2 py-1  rounded flex items-center gap-1"
                  >
                    <span>
                      <ShoppingCartCheckoutOutlined fontSize="small" />
                    </span>
                    <span onClick={() => customer(row)}>Shop as Customer</span>
                  </button>

                  <EditModal data={row} refetch={refetch}></EditModal>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
    </TableContainer>
  );
};

export default CustomerTable;
