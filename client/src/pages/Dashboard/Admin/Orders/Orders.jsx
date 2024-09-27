import Divider from "@mui/material/Divider";
import {
  Button,
  ButtonGroup,
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
import { useNavigate } from "react-router-dom";
import productsStatus from "../../../../assets/data/status.json";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [status, setStatus] = useState("all");
  const { data: orders, refetch } = useOrders(
    `/order/orders`,
    currentPage,
    status
  );
  const navigate = useNavigate();
  const rows = orders?.payload?.orders;
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
  const totalPage = Math.ceil(orders?.payload?.total / 20);
  const singleOrderInfo = async orderId => {
    if (!orderId) {
      return;
    }
    navigate(`/dashboard/admin/order/${orderId}`);
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-md p-2 md:p-5">
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
            <div className="p-5 flex justify-center overflow-x-auto">
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                {productsStatus.map(item => (
                  <Button
                    onClick={() => setStatus(item.value)}
                    disabled={status === item.value}
                    key={item.id}
                  >
                    {item.name}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            {rows?.length ? (
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
            ) : (
              <>
                <h2 className="text-center font-bold text-red-500">
                  No order found with status {status}.
                </h2>
              </>
            )}

            <Pagination2
              data={orders}
              currentPage={currentPage}
              totalData={orders?.payload?.total}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Orders;
