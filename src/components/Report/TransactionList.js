import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TransactionList(props) {
  console.log(props.data[0].customerPhone);
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
            {props.data[0].hasOwnProperty("customerPhone") ? (
              <TableCell align="right">Customer Phone</TableCell>
            ) : (
              <TableCell align="right">Station</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((data) => (
            <TableRow
              key={data.recieptNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data.recieptNo}</TableCell>
              <TableCell align="right">{data.customerName}</TableCell>
              <TableCell align="right">{data.amountRecieved}</TableCell>
              <TableCell align="right">{data.amountGiven}</TableCell>
              <TableCell align="right">{data.amountTransfered}</TableCell>
              {props.data[0].hasOwnProperty("customerPhone") ? (
                <TableCell align="right">{data.customerPhone}</TableCell>
              ) : (
                <TableCell align="right">{data.station}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
