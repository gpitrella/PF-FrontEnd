import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';

const List = () => {
  const { allOrdersToday } = useSelector((state) => state.dashboard);

  let rows = [];
  rows = allOrdersToday
  let today = new Date()

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount $</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <Link to={`/admin/purchases/details/${row.id}`} style={{ textDecoration: "none" }}>
                <div className="cellWrapper">
                    view products
                </div>
                </Link>
              </TableCell>
              <TableCell className="tableCell">{row.users[0].name}</TableCell>
              <TableCell className="tableCell">{today.toDateString()}</TableCell>
              <TableCell className="tableCell">{row.totalpurchase}</TableCell>
              <TableCell className="tableCell">Mercado Pago</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status.toUpperCase()}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
