import Divider from "@mui/material/Divider";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import OrderTableCel from "./OrderTableCel";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useOrders from "../../../../hooks/useOrders";
import { useState } from "react";
import Pagination2 from "../../../../components/Pagination2/Pagination2";
import useTotalOrders from "../../../../hooks/useTotalOrders";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const { data: orders, refetch } = useOrders("/api/order/orders", currentPage);
  const navigate = useNavigate();
  const totalOrders = useTotalOrders();
  const rows = orders?.payload?.orders;
  const totalPage = Math.ceil(totalOrders?.data?.payload?.totalOrderCount / 20);
  //update status
  const [axiosSecure] = useAxiosSecure();
  const handleStatusChange = async (event, id) => {
    try {
      const res = await axiosSecure.post(
        `api/order/update-order-status?orderId=${id}&status=${event.target.value}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const singleOrderInfo = async orderId => {
    if (!orderId) {
      return;
    }
    navigate(`/dashboard/admin/order/${orderId}`);
  };

  return (
    <>
      <div className="p-2 bg-white">
        <div className="shadow-md rounded-md p-2 md:p-5">
          <h2 className="dashboard-title">Orders</h2>
          <Divider />
          <div className="mt-5 flex justify-end">
            <div className="flex gap-5 items-center">
              <TextField
                id="standard-basic"
                label="Search by id"
                variant="standard"
                onChange={event => setSearchId(event.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => singleOrderInfo(searchId)}
              >
                Search
              </Button>
            </div>
          </div>
          <div className="mt-5 space-y-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="left">Seller info</TableCell>
                    <TableCell align="left">Customer info</TableCell>
                    <TableCell align="left">Total item</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map(row => (
                    <OrderTableCel
                      key={row.order_id}
                      row={row}
                      handleStatusChange={handleStatusChange}
                      singleOrderInfo={singleOrderInfo}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination2
              orders={orders}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
