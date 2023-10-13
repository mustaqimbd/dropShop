import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TablePagination({
  perPage,
  count,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(count / perPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>
        Showing {currentPage * perPage - perPage} to{" "}
        {currentPage * perPage < count
          ? currentPage * perPage
          : count}{" "}
        of {count} entire
      </Typography>
      <Pagination
        count={totalPages ? totalPages : 0}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
