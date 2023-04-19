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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#773E7C",
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
    const nairaTotal = accounts.reduce(
      (accumulator, curentValue) => accumulator + curentValue["naira"],
      0
    );
    const dollarTotal = accounts.reduce(
      (accumulator, curentValue) => accumulator + curentValue["dollar"],
      0
    );

    const poundTotal = accounts.reduce(
      (accumulator, curentValue) => accumulator + curentValue["pound"],
      0
    );
    const euroTotal = accounts.reduce(
      (accumulator, curentValue) => accumulator + curentValue["euro"],
      0
    );
    setTotals({ nairaTotal, dollarTotal, poundTotal, euroTotal });
  }

  async function fetchAccountData() {
    try {
      let accounts = await axiosInstance.get(
        `/accounts`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      calcTotals(accounts.data.results);
      setAccounts(accounts.data.results);
    } catch {
      setAccounts("there are no accounts to display");
    }
  }
  const createNewLegder = async () => {
    window.location.reload();
    const ledgerData = {
      naira: 0.0,
      dollar: 0.0,
      pound: 0.0,
      euro: 0.0,
      currency_total: 0.0,
      grand_total: 0.0,
      previous_total: 0.0,
      difference: 0.0,
      expense: 0.0,
      book_profit: 0.0,
      calculated_profit: 0.0,
      variance: 0.0,
    };

    await axiosInstance.post(
      `/generalledger/`,
      ledgerData,
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
  };

  React.useEffect(() => {
    fetchAccountData();
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
              <StyledTableRow key={account.url}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`${currentUrl.pathname}/update-account/${account.id}`}
                    style={{ textDecoration: "none", color: "#925098" }}
                    state={{ account: account }}
                  >
                    {account.bank_name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {account.account_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#8358; {account.naira}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#36; {account.dollar}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  &#163; {account.pound}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#128; {account.euro}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#8358; {totals.nairaTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#36; {totals.dollarTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#163; {totals.poundTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#128; {totals.euroTotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
