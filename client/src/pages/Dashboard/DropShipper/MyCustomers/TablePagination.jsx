import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function TablePagination() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
const count = 10
  return (
    <Stack spacing={2}>
      <Typography>
        Showing {page * 10 - 10} to {page * 10} of {count*10} entire
      </Typography>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
