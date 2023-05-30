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
    paddingTop: 7,
    paddingBottom: 7,
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
  const [reportId, setReportId] = React.useState();
  const [values, setValues] = React.useState([]);
  const [station, setStation] = React.useState(
    JSON.parse(localStorage.getItem("user")).station
  );

  const locaction = useLocation();
  const today = new Date();

  function createData(name, ngn, usd, gbp, eur) {
    return { name, ngn, usd, gbp, eur };
  }
  const getCompleteReport = async () => {
    const reportData = {
      currencies: { ngn: 0.0, usd: 0.0, gbp: 0.0, eur: 0.0 },
      description: station,
      station: station,
      profit: 0.0,
    };
    try {
      const createReport = await axiosInstance.post(`/reports/`, reportData);
      setReportId(createReport.data.id);
      console.log(createReport);
      const response = await axiosInstance.get(
        `/reports/${createReport.data.id}/`
      );
      const data = [
        createData(
          "Opening Balance",
          response.data.opening_balance.currencies.ngn,
          response.data.opening_balance.currencies.usd,
          response.data.opening_balance.currencies.gbp,
          response.data.opening_balance.currencies.eur
        ),
        createData(
          "Money In",
          response.data.money_in.currencies.ngn,
          response.data.money_in.currencies.usd,
          response.data.money_in.currencies.gbp,
          response.data.money_in.currencies.eur
        ),
        createData(
          "Report Balance",
          response.data.report.currencies.ngn,
          response.data.report.currencies.usd,
          response.data.report.currencies.gbp,
          response.data.report.currencies.eur
        ),
        createData(
          "Money Out",
          response.data.money_out.currencies.ngn,
          response.data.money_out.currencies.usd,
          response.data.money_out.currencies.gbp,
          response.data.money_out.currencies.eur
        ),
        createData(
          "Closing Balance",
          response.data.closing_balance.currencies.ngn,
          response.data.closing_balance.currencies.usd,
          response.data.closing_balance.currencies.gbp,
          response.data.closing_balance.currencies.eur
        ),
      ];
      setValues(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    setTimeout(getCompleteReport, 1000);
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
          {/* <Button
            variant="text"
            onClick={createNewReport}
            type="submit"
            sx={purpleButton}
          >
            New Report
          </Button> */}

          <Link
            to={`${locaction.pathname}/update-balances`}
            style={{ textDecoration: "none" }}
            state={{ reportId: reportId }}
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
              <StyledTableCell align="right">NGN</StyledTableCell>
              <StyledTableCell align="right">USD</StyledTableCell>
              <StyledTableCell align="right">GBP</StyledTableCell>
              <StyledTableCell align="right">EUR</StyledTableCell>
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
                      value={value.ngn}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#8358; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.usd}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#36; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.gbp}
                      thousandSeparator={true}
                      displayType="text"
                      renderText={(formattedValue) => (
                        <span> &#163; {formattedValue}</span>
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumericFormat
                      value={value.eur}
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
