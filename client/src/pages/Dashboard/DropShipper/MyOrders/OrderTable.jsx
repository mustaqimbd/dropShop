import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderTable = ({ data }) => {
  const rows = data;
  console.log(data);
  return (
    <TableContainer
      elevation={0}
      component={Paper}
      style={{ marginBottom: "25px" }}
    >
      <Table sx={{ minWidth: 1000 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Order Id</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Customer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Purchased</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length < 1 ? (
            <TableRow>
              <TableCell>
                <h1 className="text-center">No order</h1>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {rows?.map((row) => {
            const { name, email, mobile } = row.customer_info;
            return (
              <TableRow
                key={row.order_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.order_id}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2DA5F3] bg-[#deebf3] w-10 h-10 p-3 flex justify-center items-center rounded-full">
                      {name
                        ?.split(" ")
                        .map((w) => w.charAt(0))
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>{name}</span>
                  </div>
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{mobile}</TableCell>
                <TableCell>{row.purchased}</TableCell>
                <TableCell>{row.total_ordered_product}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
