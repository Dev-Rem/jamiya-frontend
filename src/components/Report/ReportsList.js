import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/AxiosInstance";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { purpleButton } from "../utils/Button";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import FormStack from "../utils/FormStack";
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

const ListReports = (props) => {
  return (
    <>
      {" "}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Station</TableCell>
              <TableCell align="right">NGN</TableCell>
              <TableCell align="right">USD</TableCell>
              <TableCell align="right">GBP</TableCell>
              <TableCell align="right">EUR</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data === [] ? (
              <></>
            ) : (
              <>
                {props.data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <>
                      <TableCell component="th" scope="row">
                        <Link
                          to={`/report-details`}
                          style={{
                            textDecoration: "none",
                            color: "#C9037F",
                          }}
                          state={{ report: row }}
                        >
                          {row.date_created}
                        </Link>
                      </TableCell>
                    </>

                    <TableCell align="right">{row.station}</TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.currencies.ngn}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.currencies.usd}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#36; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.currencies.gbp}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#163; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.currencies.eur}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#128; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.profit}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export function ReportsList() {
  const [reports, setReports] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const getReports = async (page) => {
    const response = await axiosInstance.get(`/reports`, {
      params: {
        page: page,
      },
    });
    setReports(response.data.results);
    setTotalPages(Math.ceil(response.data.count / 10));
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getReports(page);
  };

  React.useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <ListReports data={reports} />
      <FormStack></FormStack>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}

export function SearchedReport() {
  const locaction = useLocation();
  return (
    <>
      <ListReports data={locaction.state.data.results} />
    </>
  );
}

export function ViewReport(props) {
  const locaction = useLocation();
  const [report, setReport] = React.useState([]);

  function createData(name, ngn, usd, gbp, eur) {
    return { name, ngn, usd, gbp, eur };
  }
  const getCompleteReport = async () => {
    let reportId = locaction.state.report.id;
    try {
      const response = await axiosInstance.get(`/reports/${reportId}/`);
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
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getCompleteReport();
  }, []);
  return (
    <>
      {" "}
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
            <Link
              to={`${locaction.pathname}/update-balances`}
              style={{ textDecoration: "none" }}
              state={{ reportId: locaction.state.report.id }}
            >
              <Button variant="text" type="submit" sx={purpleButton}>
                Update Balance
              </Button>
            </Link>
            <Typography variant="h6">
              Date: {locaction.state.report.date_created}
            </Typography>
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
              {report === [] ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Please Click New Report
                  </Typography>
                </>
              ) : (
                report.map((value) => (
                  <StyledTableRow key={value.name}>
                    <StyledTableCell component="th" scope="row">
                      {value.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      &#8358; {value.ngn}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      &#36; {value.usd}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      &#163; {value.gbp}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      &#128; {value.eur}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
