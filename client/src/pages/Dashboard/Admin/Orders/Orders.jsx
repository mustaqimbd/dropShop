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
import OrderModal from "./OrderModal";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const { data: orders, refetch } = useOrders("/api/order/orders", currentPage);
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

  // modal config
  const [singleProduct, setSingleProduct] = useState("");
  const [singleProductLoading, setSingleProductLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // modal content
  const singleOrderInfo = async orderId => {
    if (!orderId) {
      return;
    }
    handleOpen();
    setSingleProductLoading(true);
    try {
      const result = await axiosSecure.get(
        `/api/order/track-order?orderId=${orderId}`
      );
      setSingleProduct(result?.data?.payload?.orderDetails[0]);
      setSingleProductLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSingleProductLoading(false);
    }
  };
  // search control

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
                    <TableCell>SL. NO.</TableCell>
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="left">Product name</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <OrderTableCel
                      key={row.order_id}
                      row={row}
                      index={index}
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
      <OrderModal
        open={open}
        setOpen={setOpen}
        refetch={refetch}
        handleOpen={handleOpen}
        handleClose={handleClose}
        singleProduct={singleProduct}
        handleStatusChange={handleStatusChange}
        singleProductLoading={singleProductLoading}
      />
    </>
  );
};

export default Orders;
