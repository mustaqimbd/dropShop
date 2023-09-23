import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import useGetRequest from "../../../../../hooks/useGetRequest";
import { PaginationInDashboard } from "../../../../../components/pagination/Pagination";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllCategoryList = () => {
  // Get the category data (you can replace this with your data fetching logic)
  const [axiosSecure] = useAxiosSecure();

  const { data, refetch } = useGetRequest("", "category");
  const categories = data?.payload?.category || [];
  const handleDeleteClick = async categoryId => {
    try {
      const response = await axiosSecure.delete(`/api/category/${categoryId}`);

      if (response.status === 200) {
        toast.success(`${response?.data?.message}`, {
          style: {
            border: "1px solid green",
          },
          position: "top-center",
        });
        refetch();
      } else {
        toast.error(`${response?.data?.message}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //pagination

  const itemsPerPage = 4; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice data for the current page
  const visibleData = categories.slice(startIndex, endIndex);

  return (
    <>
      <div className="mx-auto w-full ">
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleData.map(category => (
                <TableRow key={category._id}>
                  <TableCell>category.name</TableCell>
                  <TableCell>
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-16 h-16"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(category._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-6 text-center ">
            <PaginationInDashboard
              allProductsLength={categories?.length}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default AllCategoryList;
