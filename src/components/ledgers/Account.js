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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#C9037F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  const currentUrl = useLocation();
  const [accounts, setAccounts] = React.useState([]);
  const [totals, setTotals] = React.useState({});

  function calcTotals(accounts) {
    const nairaTotal = accounts
      .map((account) => Object.values(account)[3].naira)
      .reduce((acc, curr) => acc + curr, 0);

    const dollarTotal = accounts
      .map((account) => Object.values(account)[3].dollar)
      .reduce((acc, curr) => acc + curr, 0);

    const poundTotal = accounts
      .map((account) => Object.values(account)[3].pound)
      .reduce((acc, curr) => acc + curr, 0);

    const euroTotal = accounts
      .map((account) => Object.values(account)[3].euro)
      .reduce((acc, curr) => acc + curr, 0);
    setTotals({ nairaTotal, dollarTotal, poundTotal, euroTotal });
  }

  async function getAccounts() {
    try {
      const response = await axiosInstance.get(`/accounts`);
      setAccounts(response.data.results);
      calcTotals(response.data.results);
    } catch {
      setAccounts("there are no accounts to display");
    }
  }
  const createNewLegder = async () => {
    const ledgerData = {
      currencies: { naira: 0.0, dollar: 0.0, pound: 0.0, euro: 0.0 },
      currency_total: 0.0,
      grand_total: 0.0,
      previous_total: 0.0,
      difference: 0.0,
      expense: 0.0,
      book_profit: 0.0,
      calculated_profit: 0.0,
      variance: 0.0,
    };

    await axiosInstance.post(`/generalledger/`, ledgerData);
  };

  React.useEffect(() => {
    setTimeout(getAccounts, 2000);
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
          <Button
            onClick={createNewLegder}
            variant="text"
            type="submit"
            sx={purpleButton}
          >
            New Report
          </Button>
          <Link
            to={`${currentUrl.pathname}/add-account`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              Add account
            </Button>
          </Link>
          <Link
            to={`${currentUrl.pathname}/update-rates`}
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
              <StyledTableCell align="right">Naira</StyledTableCell>
              <StyledTableCell align="right">Dollar</StyledTableCell>
              <StyledTableCell align="right">Pound</StyledTableCell>
              <StyledTableCell align="right">Euro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <StyledTableRow key={account.id}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`${currentUrl.pathname}/update-account/${account.id}`}
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
                    value={account.currencies.naira}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#8358; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumericFormat
                    value={account.currencies.dollar}
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
                    value={account.currencies.pound}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#163; {formattedValue}</span>
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumericFormat
                    value={account.currencies.euro}
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
                  value={totals.nairaTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.nairaTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#36; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.nairaTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#163; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.nairaTotal}
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
