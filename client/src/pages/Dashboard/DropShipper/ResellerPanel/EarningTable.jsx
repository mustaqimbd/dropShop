import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(orderId, customer, date, amount, protein) {
  return { orderId, customer, date, amount, protein };
}

const rows = [
  createData("#fu773u", "Mustaqim Khan", "September 22, 2023", 24, 4.0),
  createData("#js4hs3", "Abir Mahmud", "September 22, 2023", 37, 4.3),
];

const EarningTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>
              <h3 className="font-bold">Resent Earning</h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Protein</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.orderId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.orderId}</TableCell>
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
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EarningTable;
