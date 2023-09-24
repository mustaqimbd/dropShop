import { useState } from "react";
import useAllSellers from "../../../../hooks/useAllSellers";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableRowCompo from "./TableRowCompo";

const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useAllSellers(currentPage);
  const users = data?.payload?.sellers;
  console.log(data?.payload?.sellers);
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-2 md:p-5">
        <h2 className="dashboard-title">Sellers</h2>
        <Divider />
        <div className="mt-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="font-bold text-heading">SL. NO.</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold text-heading">Seller name</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold text-heading">Profile</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold text-heading">Payouts</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold text-heading">Joined date</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-bold text-heading">Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRowCompo key={user.email} user={user} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Sellers;
