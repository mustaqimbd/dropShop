import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import useAuthProvider from "../../../../hooks/useAuthProvider";
import ChangeModal from "./ChangeModal";

const MyInfo = () => {
  const { user } = useAuthProvider();
  const { name, email, phone } = user;

  console.log(user);
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">
          Current store name : {user.shop_info?.shop_name}
        </h1>
        <h3 className="text-lg">Your store No : </h3>
        <div className="mt-4">
          <ChangeModal />
        </div>
      </div>
      <div className="mt-10">
        <TableContainer elevation={0} component={Paper}>
          <h3 className="text-center font-bold text-xl py-2 border-b border-gray-200 bg-gray-200">
            User Info
          </h3>
          <Table aria-label="customized table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <div className="text-lg">
                    <div className="flex items-center">
                      <span className="w-[25%]">Name : </span>
                      <span className="w-[75%]">{name}</span>
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
                    <Divider style={{ margin: "20px 0" }} />
                    <div className="flex items-center">
                      <span className="w-[25%]">Address : </span>
                      <span className="w-[75%] "></span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider />
        </TableContainer>
      </div>
    </div>
  );
};

export default MyInfo;
