import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

const ProfitTable = ({ data }) => {
  const rows = data;

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Order</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Profit&apos;s Status
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Customer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Purchased</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Total Order</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Total Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length < 1 ? (
            <TableRow>
              <TableCell>
                <h1 className="text-center">No profit yet</h1>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {rows?.map((row) => (
            <TableRow
              key={row.order_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.order_id}</TableCell>
              <TableCell>{row.completed_date}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-[#2DA5F3] bg-[#deebf3] w-10 h-10 p-3 flex justify-center items-center rounded-full">
                    {row.name
                      ?.split(" ")
                      .map((w) => w.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>{row.name}</span>
                </div>
              </TableCell>
              <TableCell>{row.purchased}</TableCell>
              <TableCell>{row.total_ordered_product}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
    </TableContainer>
  );
};

export default ProfitTable;
