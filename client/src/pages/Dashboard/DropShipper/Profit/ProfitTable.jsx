import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(_id, orders, date, status, customer, purchased, total) {
  return { _id, orders, date, status, customer, purchased, total };
}

const rows = [
  createData(
    "83772jjd",
    "#67uUY",
    "24/9/2023",
    "Pending",
    "Mustaqim Khan",
    400,
    500
  ),
  createData(
    "3887266",
    "#67uUY",
    "24/9/2023",
    "Pending",
    "Md Abdullah",
    400,
    500
  ),
];

const ProfitTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Profit&apos;s Status</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Purchased</TableCell>
            <TableCell>Total Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
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
              <TableCell>{row.purchased}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfitTable;
