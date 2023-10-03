import styled from "@emotion/styled";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { Link } from "react-router-dom";

const OrderedProductsTable = ({ orderDetails }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      fontWeight: "bold",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const rows = orderDetails?.products;
  return (
    <div className="mt-10">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl No.</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Product</StyledTableCell>
              <StyledTableCell align="left">Unit</StyledTableCell>
              <StyledTableCell align="left">Price/Unit</StyledTableCell>
              <StyledTableCell align="left">Subtotal</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <StyledTableRow key={row?.product_slug}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Avatar src={row?.product_image[0]} alt={row?.product_name} />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link to={`/product-info/${row.product_slug}`}>
                    {row?.product_name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                <StyledTableCell align="left">
                  ${row.unit_price}
                </StyledTableCell>
                <StyledTableCell align="left">${row.subtotal}</StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="right">Tax</StyledTableCell>
              <StyledTableCell align="left">N/A</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="right">Shipping</StyledTableCell>
              <StyledTableCell align="left">
                ${orderDetails.delivery_charge}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              <StyledTableCell align="left">
                ${orderDetails.subtotal + orderDetails.delivery_charge}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderedProductsTable;
