import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import useGetRequest from "../../../../hooks/useGetRequest";
import { useState } from "react";
import TablePagination from "../../../../components/pagination/TablePagination";

const EarningTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const { data } = useGetRequest(
    "resent-earning",
    `reseller/resent-earning?page=${currentPage}&limit=${perPage}`
  );

  const rows = data.payload?.resentEarning;
  return (
    <TableContainer elevation={0} component={Paper}>
      <h3 className="text-center font-bold text-xl py-2 border-b border-gray-200">
        Resent Earning
      </h3>
      <Table sx={{ minWidth: 750 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Order Id</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Customer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Total Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length < 1 ? (
            <TableRow>
              <TableCell>
                <h1 className="text-center">No earning</h1>
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
              <TableCell>{row.completed_date}</TableCell>
              <TableCell>{row.total} ৳</TableCell>
              <TableCell>{row.total_ordered_product}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
      <TablePagination
        perPage={perPage}
        count={data.payload?.count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></TablePagination>
    </TableContainer>
  );
};

export default EarningTable;
