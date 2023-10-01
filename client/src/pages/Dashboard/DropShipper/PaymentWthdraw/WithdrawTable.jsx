import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

function createData(_id, amount, paymentMethod, date, notes) {
  return { _id, amount, paymentMethod, date, notes };
}

const rows = [
  createData("#fu773u", 500, "Bkash", "29/09/2023", "notes"),
  createData("#fu773f", 500, "Bkash", "29/09/2023", "notes"),
];

const WithdrawTable = () => {
  return (
    <TableContainer elevation={0} component={Paper}>
      <h3 className="text-center font-bold text-xl py-2 border-b border-gray-200">
        Resent Withdraw
      </h3>
      <Table sx={{ minWidth: 750 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Payment Method</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date Processed</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.amount} ৳</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
    </TableContainer>
  );
};

export default WithdrawTable;
