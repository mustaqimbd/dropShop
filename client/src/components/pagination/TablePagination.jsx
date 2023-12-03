import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TablePagination({
  perPage,
  count = 0,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(count / perPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="mt-5">
      <Stack spacing={2}>
        <Typography>
          Showing {currentPage * perPage - perPage} to{" "}
          {currentPage * perPage < count ? currentPage * perPage : count} of{" "}
          {count} entire
        </Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
