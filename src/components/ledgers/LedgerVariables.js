import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled, experimental_sx as sx } from "@mui/system";

const rows = {
  ledgerTotal: 10000,
  recievable: 20000,
  grandTotal: 3000,
  previousTotal: 4000,
  difference: 5000,
  expenses: 6000,
  bookProfit: 7000,
  calculatedProfit: 8000,
  variance: 9000,
};

const StyledTableCell = styled(TableCell)(
  sx({
    fontWeight: "bold",
    color: "#925098",
  })
);

export default function LedgerVariables() {
  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "#303030", marginTop: "30px", marginBottom: "10px" }}
      >
        Ledger Variables
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableBody>
            <TableRow>
              <StyledTableCell>Currency Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.ledgerTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Recievable</StyledTableCell>
              <Divider orientation="vertical" flexItem="true" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.recievable}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Grand Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.grandTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Prrevious Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.previousTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Difference</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.difference}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Expenses</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {" "}
                {rows.expenses}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Book Profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.bookProfit}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Calculated profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.calculatedProfit}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Variance</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {rows.variance}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
