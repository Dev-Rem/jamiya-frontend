import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled, experimental_sx as sx } from "@mui/system";
import { axiosInstance } from "../utils/AxiosInstance";
import { NumericFormat } from "react-number-format";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.white,
    color: "#C9037F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function LedgerVariables() {
  const [ledgerVariables, setLedgerVariables] = React.useState({});

  async function getLedgerVariables() {
    try {
      const response = await axiosInstance.get(`/generalledger/`);
      setLedgerVariables(response.data.results[0]);
    } catch {
      setLedgerVariables("You need to create a new report");
    }
  }
  React.useEffect(() => {
    setTimeout(getLedgerVariables, 2000);
  }, []);
  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "#303030", marginTop: "30px", marginBottom: "10px" }}
      >
        Ledger Variables {LedgerVariables.date_created}
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
                <NumericFormat
                  value={ledgerVariables.currency_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Grand Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.grand_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Previous Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.previous_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Difference</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.difference}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Expenses</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.expense}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Book Profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.book_profit}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Calculated profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.calculated_profit}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Variance</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={ledgerVariables.variance}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
