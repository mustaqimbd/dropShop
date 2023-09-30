import { Button, Chip, TableCell, TableRow } from "@mui/material";

const OrderTableCel = ({ row, singleOrderInfo }) => {
  const createdAt = row.createdAt;
  const isoDate = new Date(createdAt);

  return (
    <>
      <TableRow
        key={row?.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <span className="text-caption font-bold"> {row?.order_id}</span>
        </TableCell>
        <TableCell component="th" scope="row">
          <h2 className="text-caption font-bold text-lg">
            {row?.seller_info?.name}
          </h2>
          <p className="text-caption font-bold">{row?.seller_info?.email}</p>
        </TableCell>
        <TableCell component="th" scope="row">
          <h2 className="text-caption font-bold text-lg">
            {row?.customer_info?.name}
          </h2>
          <p className="text-caption font-bold">
            0{row?.customer_info?.mobile}
          </p>
        </TableCell>
        <TableCell align="left">
          <span className="text-caption font-bold">
            <span className="text-caption font-bold">
              {" "}
              {row?.total_ordered_product}
            </span>
          </span>
        </TableCell>
        <TableCell align="left">
          <span className="text-caption font-bold">
            {" "}
            {`${isoDate.getFullYear()}-${isoDate.getMonth()}-${isoDate.getDay()}`}
          </span>
        </TableCell>
        <TableCell align="left">
          <Chip
            label={row?.status}
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
              background: `${
                row?.status === "shifted"
                  ? "#29cc97"
                  : row.status === "pending"
                  ? "#fec400"
                  : row.status === "picked by currier"
                  ? "#4c84ff"
                  : row.status === "canceled"
                  ? "#fe5461"
                  : row.status === "completed"
                  ? "#2DB224"
                  : row.status === "processing"
                  ? "#FA8232"
                  : ""
              }`,
            }}
          />
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => singleOrderInfo(row?.order_id)}
          >
            Details
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableCel;
