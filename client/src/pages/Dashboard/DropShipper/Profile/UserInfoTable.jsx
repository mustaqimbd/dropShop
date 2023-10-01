import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

const userInfo = {
  _id: "2736672",
  firstName: "Mustaqim",
  lastName: "Khan",
  email: "mustaqimkhan@gmail.com",
  phone:'01712345678'
};
const { firstName, lastName, email,phone } = userInfo;

const UserInfoTable = () => {
  return (
    <TableContainer elevation={0} component={Paper}>
      <h3 className="text-center font-bold text-xl py-2 border-b border-gray-200 bg-gray-200">
        User Info
      </h3>
      <Table aria-label="customized table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              <div className="text-lg">
                <div className="flex items-center">
                  <span className="w-[25%]">First Name : </span>
                  <span className="w-[75%]">{firstName}</span>
                </div>
                <Divider style={{ margin: "20px 0" }} />
                <div className="flex items-center">
                  <span className="w-[25%]">Last Name : </span>
                  <span className="w-[75%] ">{lastName}</span>
                </div>
                <Divider style={{ margin: "20px 0" }} />
                <div className="flex items-center">
                  <span className="w-[25%]">Email : </span>
                  <span className="w-[75%] ">{email}</span>
                </div>
                <Divider style={{ margin: "20px 0" }} />
                <div className="flex items-center">
                  <span className="w-[25%]">Phone : </span>
                  <span className="w-[75%] ">{phone}</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider />
    </TableContainer>
  );
};

export default UserInfoTable;
