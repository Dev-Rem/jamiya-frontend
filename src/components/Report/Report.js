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
import Button from "@mui/material/Button";
import { axiosInstance } from "../utils/AxiosInstance";
import Typography from "@mui/material/Typography";
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

export function Report() {
  const [values, setValues] = React.useState([]);

  const currentUrl = useLocation();
  const today = new Date();
  let station = getStation(currentUrl);

  function getStation(currentUrl) {
    switch (currentUrl.pathname) {
      case "/frontdesk":
        return "FRONTDESK";
      case "/online":
        return "ONLINE";
      case "/bank":
        return "BANK";
      case "/marketing":
        return "MARKETING";
    }
  }
  const data = [];

  const createNewReport = async () => {
    const reportData = {
      currencies: { naira: 0.0, dollar: 0.0, pound: 0.0, euro: 0.0 },
      description: station,
      station: station,
      profit: 0.0,
    };
    try {
      const response = await axiosInstance.post(`/reports/`, reportData);
      localStorage.setItem(`${currentUrl.pathname}`, response.data.id);

      window.location.reload();
    } catch (error) {}
  };
  function createData(name, naira, dollar, pound, euro) {
    return { name, naira, dollar, pound, euro };
  }
  const getCompleteReport = async () => {
    let reportId = localStorage.getItem(`${currentUrl.pathname}`);
    try {
      const response = await axiosInstance.get(`/reports/${reportId}/`);
      const data = [
        createData(
          "Opening Balance",
          response.data.opening_balance.currencies.naira,
          response.data.opening_balance.currencies.dollar,
          response.data.opening_balance.currencies.pound,
          response.data.opening_balance.currencies.euro
        ),
        createData(
          "Money In",
          response.data.money_in.currencies.naira,
          response.data.money_in.currencies.dollar,
          response.data.money_in.currencies.pound,
          response.data.money_in.currencies.euro
        ),
        createData(
          "Report Balance",
          response.data.report.currencies.naira,
          response.data.report.currencies.dollar,
          response.data.report.currencies.pound,
          response.data.report.currencies.euro
        ),
        createData(
          "Money Out",
          response.data.money_out.currencies.naira,
          response.data.money_out.currencies.dollar,
          response.data.money_out.currencies.pound,
          response.data.money_out.currencies.euro
        ),
        createData(
          "Closing Balance",
          response.data.closing_balance.currencies.naira,
          response.data.closing_balance.currencies.dollar,
          response.data.closing_balance.currencies.pound,
          response.data.closing_balance.currencies.euro
        ),
      ];
      setValues(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    setTimeout(getCompleteReport, 2000);
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "inherit",
          alignContent: "right",
        }}
      >
        <Stack spacing={2} direction="row" mb={2}>
          <Button
            variant="text"
            onClick={createNewReport}
            type="submit"
            sx={purpleButton}
          >
            Get Report
          </Button>

          <Link
            to={`${currentUrl.pathname}/new-transaction`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              New Transaction
            </Button>
          </Link>
          <Link
            to={`${currentUrl.pathname}/update-balances`}
            style={{ textDecoration: "none" }}
            state={{ reportId: localStorage.getItem(`${currentUrl.pathname}`) }}
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              Update Balance
            </Button>
          </Link>
          <Typography variant="h6">{today.toLocaleDateString()}</Typography>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>REPORT </StyledTableCell>
              <StyledTableCell align="right">Naira</StyledTableCell>
              <StyledTableCell align="right">Dollar</StyledTableCell>
              <StyledTableCell align="right">Pound</StyledTableCell>
              <StyledTableCell align="right">Euro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values === [] ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Please Click New Report
                </Typography>
              </>
            ) : (
              values.map((value) => (
                <StyledTableRow key={value.name}>
                  <StyledTableCell component="th" scope="row">
                    {value.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.naira}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#8358; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.dollar}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#36; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.pound}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#163; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.euro}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#128; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
