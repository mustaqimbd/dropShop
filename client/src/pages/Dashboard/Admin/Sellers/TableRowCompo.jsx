import { Avatar, Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const TableRowCompo = ({ user, index }) => {
  console.log(user);
  const dateObj = new Date(user.createdAt);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  return (
    <TableRow
      key={user.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="font-semibold"
    >
      <TableCell align="left">
        <span className="font-semibold text-linkText">{index + 1}</span>
      </TableCell>
      <TableCell component="th" scope="row">
        <span className="font-semibold text-linkText">{user.name}</span>
      </TableCell>
      <TableCell align="left">
        <Avatar src={user.profile_pic} alt={user.name} />
      </TableCell>
      <TableCell align="left">
        <span className="font-semibold text-linkText">${user.payouts}</span>
      </TableCell>
      <TableCell align="left">
        <span className="font-semibold text-linkText">{`${day}/${month}/${year}`}</span>
      </TableCell>
      <TableCell align="left">
        <Link to="/">
          <Button variant="contained" style={{ background: "#2DA5F3" }}>
            View info
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default TableRowCompo;
