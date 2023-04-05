import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import { PurpleButton } from "../utils/Button";
import TransactionForm from "../utils/TransactionForm";

export function TransactionList(props) {
  const data = props.data;
  console.log(data);
  const currentUrl = useLocation();

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reciept No.</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Amount Recieved</TableCell>
              <TableCell align="right">Amount Given</TableCell>
              <TableCell align="right">Amount Transfered</TableCell>
              {data.hasOwnProperty("customer_phone") ? (
                <TableCell align="right">Customer Phone</TableCell>
              ) : (
                <TableCell align="right">Station</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                // key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.id}</TableCell>

                <TableCell align="right">{data.customer_name1}</TableCell>
                <TableCell align="right">{data.amount_recieved}</TableCell>
                <TableCell align="right">{data.cash_given}</TableCell>
                <TableCell align="right">{data.amount_transfered}</TableCell>
                {data.hasOwnProperty("customer_phone") ? (
                  <TableCell align="right">{data.customer_phone}</TableCell>
                ) : (
                  <TableCell align="right">{data.initiator}</TableCell>
                )}
                <TableCell alighn="right">
                  <Link
                    to={`${currentUrl.pathname}/view-transaction-details`}
                    style={{ textDecoration: "none" }}
                    state={{ data: data }}
                  >
                    <PurpleButton name="View" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ViewEditDeleteTransaction() {
  const location = useLocation();
  const { data } = location.state;
  return (
    <>
      <TransactionForm data={data} use="edit" />
    </>
  );
}
