import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
              <TableCell sx={{ fontWeight: "bold", color: "#925098" }}>
                Currency Total
              </TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.ledgerTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Recievable</TableCell>
              <Divider orientation="vertical" flexItem="true" />
              <TableCell align="right">{rows.recievable}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grand Total</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.grandTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prrevious Total</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.previousTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Difference</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.difference}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Expenses</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.expenses}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Book Profit</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.bookProfit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Calculated profit</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.calculatedProfit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Variance</TableCell>
              <Divider orientation="vertical" />
              <TableCell align="right">{rows.variance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
