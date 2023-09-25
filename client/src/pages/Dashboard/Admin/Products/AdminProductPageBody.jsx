import React from 'react'
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein, cobi) {
  return { name, calories, fat, carbs, protein, cobi };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 70),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 40),
  createData('Eclair', 262, 16.0, 24, 6.0, 30),
  createData('Cupcake', 305, 3.7, 67, 4.3, 22),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 12),
  createData('cobi', 356, 16.0, 49, 3.9, 25),
];


const AdminProductPageBody = () => {
  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Offer</TableCell>
            <TableCell align="right">Purchased</TableCell>
            <TableCell align="right">Stock</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.cobi}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminProductPageBody
