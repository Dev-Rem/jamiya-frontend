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
import { WarningAlert } from "../utils/Alerts";

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

export function Report() {
  const [alert, setAlert] = React.useState(false);
  const [values, setValues] = React.useState([]);

  const currentUrl = useLocation();
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
  function createData(name, naira, dollar, pound, euro) {
    return { name, naira, dollar, pound, euro };
  }
  const data = [];

  const createNewReport = async () => {
    const reportData = {
      naira: 0.0,
      dollar: 0.0,
      pound: 0.0,
      euro: 0.0,
      description: "Front Desk",
      station: station,
      profit: 0.0,
    };
    try {
      const createdReport = await axiosInstance.post(
        `/reports/`,
        reportData,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      localStorage.setItem(`${currentUrl.pathname}`, createdReport.data.id);
      console.log(createdReport);
      window.location.reload();
    } catch (error) {}
  };
  function createData(name, naira, dollar, pound, euro) {
    return { name, naira, dollar, pound, euro };
  }
  const getCompleteReport = async () => {
    let reportId = localStorage.getItem(`${currentUrl.pathname}`);
    try {
      const completeReport = await axiosInstance.get(
        `/reports/${reportId}/`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      const data = [
        createData(
          "Opening Balance",
          completeReport.data.opening_balance.naira,
          completeReport.data.opening_balance.dollar,
          completeReport.data.opening_balance.pound,
          completeReport.data.opening_balance.euro
        ),
        createData(
          "Money In",
          completeReport.data.money_in.naira,
          completeReport.data.money_in.dollar,
          completeReport.data.money_in.pound,
          completeReport.data.money_in.euro
        ),
        createData(
          "Report Balance",
          completeReport.data.report.naira,
          completeReport.data.report.dollar,
          completeReport.data.report.pound,
          completeReport.data.report.euro
        ),
        createData(
          "Money Out",
          completeReport.data.money_out.naira,
          completeReport.data.money_out.dollar,
          completeReport.data.money_out.pound,
          completeReport.data.money_out.euro
        ),
        createData(
          "Closing Balance",
          completeReport.data.closing_balance.naira,
          completeReport.data.closing_balance.dollar,
          completeReport.data.closing_balance.pound,
          completeReport.data.closing_balance.euro
        ),
      ];
      setValues(data);
    } catch (error) {
      setAlert(true);
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };
  React.useEffect(() => {
    setTimeout(getCompleteReport, 5000);
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
            New Report
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
          >
            <Button variant="text" type="submit" sx={purpleButton}>
              Update Balance
            </Button>
          </Link>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>REPORT</StyledTableCell>
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
                    &#8358; {value.naira}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    &#36; {value.dollar}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    &#163; {value.pound}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    &#128; {value.euro}
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
