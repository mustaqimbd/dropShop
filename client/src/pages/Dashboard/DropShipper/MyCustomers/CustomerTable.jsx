import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import {
  ShoppingCartCheckoutOutlined,
  ModeEditOutline,
} from "@mui/icons-material";
import { Divider } from "@mui/material";

function createData(customer, company, spend, orders, email, phone) {
  return { customer, company, spend, orders, email, phone };
}

const rows = [
  createData(
    "Mustaqim Khan",
    "ABC",
    2023,
    24,
    "example@gmail.com",
    "01712345679"
  ),
  createData(
    "Abir Mahmud",
    "ABC",
    2023,
    37,
    "example@gmail.com",
    "01712345678"
  ),
];

const CustomerTable = () => {
  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 1100 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Customer</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Company</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Total Spend</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Number of orders</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Phone</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.phone}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
              <TableCell>{row.company}</TableCell>
              <TableCell align="center">{row.spend} ৳</TableCell>
              <TableCell align="center">{row.orders}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-3 items-center text-white ">
                  <Link className="bg-[#83B735] px-2 py-1 text-sm rounded flex items-center gap-1">
                    <span>
                      <ShoppingCartCheckoutOutlined fontSize="small" />
                    </span>
                    <span>Shop as Customer</span>
                  </Link>

                  <button className="text-[#2DA5F3] px-2 py-1 rounded text-sm flex items-center gap-1 font-bold">
                    <span>
                      <ModeEditOutline fontSize="small" />
                    </span>
                    <span>Edit</span>
                  </button>
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
