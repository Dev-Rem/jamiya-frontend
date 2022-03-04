import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  recieptNo,
  customerName,
  amountRecieved,
  amountGiven,
  amountTransfered,
  customerPhone
) {
  return {
    recieptNo,
    customerName,
    amountRecieved,
    amountGiven,
    amountTransfered,
    customerPhone,
  };
}

const rows = [
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "+2349065002380"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "+2349065002380"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "+2349065002380"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "+2349065002380"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "+2349065002380"),
];

export default function TransactionList() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reciept No.</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Amount Recieved</TableCell>
            <TableCell align="right">Amount Given</TableCell>
            <TableCell align="right">Amount Transfered</TableCell>
            <TableCell align="right">Customer Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.recieptNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.recieptNo}</TableCell>
              <TableCell align="right">{row.customerName}</TableCell>
              <TableCell align="right">{row.amountRecieved}</TableCell>
              <TableCell align="right">{row.amountGiven}</TableCell>
              <TableCell align="right">{row.amountTransfered}</TableCell>
              <TableCell align="right">{row.customerPhone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
