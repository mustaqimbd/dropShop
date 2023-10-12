import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TablePagination({
  perPage,
  totalQuantity,
  currentPage,
  setCurrentPage,
  refetch,
}) {
  const totalPages = Math.ceil(totalQuantity / perPage);
 
  const handleChange = (event, value) => {
    setCurrentPage(value);
    refetch();
  };

  return (
    <Stack spacing={2}>
      <Typography>
        Showing {currentPage * perPage - perPage} to{" "}
        {currentPage * perPage < totalQuantity
          ? currentPage * perPage
          : totalQuantity}{" "}
        of {totalQuantity} entire
      </Typography>
      <Pagination
        count={totalPages ? totalPages : 0}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
