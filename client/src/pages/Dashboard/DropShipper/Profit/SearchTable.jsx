import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

function createData(_id, orders, date, status, customer, purchased, total) {
  return { _id, orders, date, status, customer, purchased, total };
}

const rows = [
  createData(
    "387363838",
    "#67uUY",
    "24/9/2023",
    "Pending",
    "Mustaqim khan Mustaqim",
    400,
    500
  ),
];

const SearchTable = () => {
  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Order"
              />
            </TableCell>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Date"
              />
            </TableCell>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Status"
              />
            </TableCell>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Customer"
              />
            </TableCell>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Purchased"
              />
            </TableCell>
            <TableCell>
              <input
                className="p-2 w-[100%] border border-gray-200 outline-[#83B735]"
                type="text"
                placeholder="Search Total Order"
              />
            </TableCell>
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
      <Divider />
    </TableContainer>
  );
};

export default SearchTable;
