import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { purpleButton } from "../utils/Button";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/AxiosInstance";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import { calcTotals } from "../utils/Definitions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#C9037F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
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

export default function Account() {
  const locaction = useLocation();
  const [accounts, setAccounts] = React.useState([]);
  const [totals, setTotals] = React.useState({});

  async function getAccounts() {
    try {
      const response = await axiosInstance.get(`/accounts`);
      setAccounts(response.data.results);
      setTotals(calcTotals(response.data.results));
    } catch {
      setAccounts("there are no accounts to display");
    }
  }
  const createNewLegder = async () => {
    window.location.reload();
  };

  React.useEffect(() => {
    setTimeout(getAccounts, 1000);
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "inherit",
          alignContent: "right",
          mb: 2,
        }}
      >
        <Stack spacing={2} direction="row">
          <Link
            to={`${locaction.pathname}/add-account`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              Add account
            </Button>
          </Link>
          <Link
            to={`${locaction.pathname}/update-rates`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              Update Rate
            </Button>
          </Link>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 700,
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Bank Name</StyledTableCell>
              <StyledTableCell>Account Name</StyledTableCell>
              <StyledTableCell align="right">NGN</StyledTableCell>
              <StyledTableCell align="right">USD</StyledTableCell>
              <StyledTableCell align="right">GBP</StyledTableCell>
              <StyledTableCell align="right">EUR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <StyledTableRow key={account.id}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`${locaction.pathname}/update-account`}
                    style={{ textDecoration: "none", color: "#C9037F" }}
                    state={{ account: account }}
                  >
                    {account.bank_name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {account.account_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumericFormat
                    value={account.currencies.ngn}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#8358; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumericFormat
                    value={account.currencies.usd}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#36; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <NumericFormat
                    value={account.currencies.gbp}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#163; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumericFormat
                    value={account.currencies.eur}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#128; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.ngnTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.usdTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#36; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.gbpTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#163; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.eurTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#128; {formattedValue}</span>
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
