import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Pagination2 from "../../../../components/Pagination2/Pagination2";

const AdminProductPageBody = ({ handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [axiosSecure] = useAxiosSecure();
  const { data: totalProducts = [], isLoading } = useQuery({
    queryKey: ["all-products", currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/admin/dashboard/products?page=${currentPage}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const totalPage = Math.ceil(totalProducts?.payload?.total / 20);
  const rows = totalProducts?.payload?.products;
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Total sold</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className="font-bold text-caption">
                    {row?.product_id}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <Avatar src={row?.images[0]?.link} alt={row?.product_name} />
                </TableCell>
                <TableCell align="left">
                  <span className="font-bold text-caption">
                    {row?.product_name}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="font-bold text-caption">
                    {row?.total_sold}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="font-bold text-caption">
                    {row?.available_quantity}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <div>
                    <IconButton
                      color="error2"
                      onClick={() => handleDelete(row?.product_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination2
        data={totalProducts}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalData={totalProducts?.payload?.total}
        totalPage={totalPage}
      />
    </div>
  );
};

export default AdminProductPageBody;
