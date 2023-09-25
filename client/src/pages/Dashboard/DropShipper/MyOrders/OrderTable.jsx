import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  orders,
  date,
  status,
  customer,
  email,
  phone,
  purchased,
  total
) {
  return { orders, date, status, customer, email, phone, purchased, total };
}

const rows = [
  createData(
    "#67uUY",
    "24/9/2023",
    "Pending",
    "Mustaqim Khan",
    "example@gmail.com",
    "01712345679",
    400,
    500
  ),
  createData(
    "#67uUY",
    "24/9/2023",
    "Pending",
    "Md Abdullah",
    "example@gmail.com",
    "01712345678",
    400,
    500
  ),
];

const OrderTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Purchased</TableCell>
            <TableCell>Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.phone}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.orders}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
              <div className="flex items-center gap-2">
                  <span className="text-[#2DA5F3] bg-[#deebf3] p-3 rounded-full">
                    {row.customer.split(" ")[0].charAt(0) &&
                    row.customer.split(" ")[1]?.charAt(0) &&
                    row.customer.split(" ")[2]?.charAt(0)
                      ? row.customer.split(" ")[0].charAt(0) +
                        row.customer.split(" ")[1].charAt(0) +
                        row.customer.split(" ")[2].charAt(0)
                      : row.customer.split(" ")[0].charAt(0) &&
                        row.customer.split(" ")[1]?.charAt(0)
                      ? row.customer.split(" ")[0].charAt(0) +
                        row.customer.split(" ")[1].charAt(0)
                      : row.customer.split(" ")[0].charAt(0)}
                  </span>
                  <span>{row.customer}</span>
                </div>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.purchased}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
