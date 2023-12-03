import { useState } from "react";
import useAllSellers from "../../../../hooks/useAllSellers";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableRowCompo from "./TableRowCompo";

const Sellers = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage] = useState(1);
  const { data } = useAllSellers(currentPage, searchEmail);
  const users = data?.payload?.sellers;
  const handleSearch = event => {
    event.preventDefault();
    const email = event.target.email.value;
    setSearchEmail(email);
  };
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-2 md:p-5">
        <h2 className="dashboard-title">Sellers</h2>
        <Divider />
        <div className="m-5">
          <div className="mb-5">
            <form
              className="max-w-md w-full flex gap-2"
              onSubmit={handleSearch}
            >
              <div className="flex-1">
                <TextField
                  id="outlined-basic"
                  label="Search user by email "
                  variant="outlined"
                  name="email"
                  className="w-full"
                />
              </div>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </form>
            <h2 className="font-semibold my-2 text-hotBadge">
              {users?.length ? "" : data?.message}
            </h2>
          </div>
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
                    <span className="font-bold text-heading">Seller email</span>
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
                {users?.length ? (
                  users?.map((user, index) => (
                    <TableRowCompo key={user.email} user={user} index={index} />
                  ))
                ) : (
                  <TableRow></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Sellers;
