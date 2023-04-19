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
import { axiosInstance } from "../utils/AxiosInstance";
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
  const [ledgerVariables, setLedgerVariables] = React.useState({});
  async function fetchLedgerVariables() {
    try {
      let ledgerVariables = await axiosInstance.get(
        `/generalledger`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      setLedgerVariables(ledgerVariables.data.results[0]);
    } catch {
      setLedgerVariables("You need to create a new report");
    }
  }
  React.useEffect(() => {
    fetchLedgerVariables();
  }, []);
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
                {ledgerVariables.currency_total}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Recievable</StyledTableCell>
              <Divider orientation="vertical" flexItem="true" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.recievable}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Grand Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.grand_total}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Prrevious Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.previous_total}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Difference</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.difference}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Expenses</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {" "}
                {ledgerVariables.expense}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Book Profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.book_profit}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Calculated profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.calculated_profit}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Variance</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {ledgerVariables.variance}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
