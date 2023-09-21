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
import useGetRequest from "../../../../../hooks/useGetRequest";

const RecentOrders = () => {
  const recentOrders = useGetRequest(
    "Recent-orders",
    "admin/dashboard/recent-orders?limit=6&skip=0"
  );
  const rows = recentOrders?.data?.payload?.orders;
  console.log(recentOrders?.data?.payload?.orders);
  return (
    <>
      <div className="shadow-md rounded-md p-2 md:p-5 mx-2 mt-5">
        <h2 className="dashboard-title">Recent orders</h2>
        <Divider />
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
                          row.status === "Completed"
                            ? "#29cc97"
                            : row.status === "Pending"
                            ? "#fec400"
                            : row.status === "On the way"
                            ? "#4c84ff"
                            : row.status === "Canceled"
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
          <Divider />p Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Repellendus id fugiat voluptatum? Laboriosam natus sint quia provident
          cumque qui quam, odio dolores quis iste ipsa omnis officiis suscipit
          accusamus neque!
        </TableContainer>
      </div>
    </>
  );
};

export default RecentOrders;
