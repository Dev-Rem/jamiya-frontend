import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { axiosInstance } from "../utils/AxiosInstance";

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

export function ReportDetails(props) {
  const [values, setValues] = React.useState({});

  function createData(name, ngn, usd, gbp, eur) {
    return { name, ngn, usd, gbp, eur };
  }
  const getCompleteReport = async () => {
    try {
      const response = await axiosInstance.get(
        `/reports/${JSON.parse(localStorage.getItem("user")).station}/`
      );
      const data = [
        createData(
          "Opening Balance",
          response.data.opening_balance.ngn,
          response.data.opening_balance.usd,
          response.data.opening_balance.gbp,
          response.data.opening_balance.eur
        ),
        createData(
          "Money In",
          response.data.money_in.ngn,
          response.data.money_in.usd,
          response.data.money_in.gbp,
          response.data.money_in.eur
        ),
        createData(
          "Report Balance",
          response.data.report.ngn,
          response.data.report.usd,
          response.data.report.gbp,
          response.data.report.eur
        ),
        createData(
          "Money Out",
          response.data.money_out.ngn,
          response.data.money_out.usd,
          response.data.money_out.gbp,
          response.data.money_out.eur
        ),
        createData(
          "Closing Balance",
          response.data.closing_balance.ngn,
          response.data.closing_balance.usd,
          response.data.closing_balance.gbp,
          response.data.closing_balance.eur
        ),
      ];
      setValues(data);
    } catch (error) {}
  };
  React.useEffect(() => {
    getCompleteReport();
    console.log(values);
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>REPORT</StyledTableCell>
              <StyledTableCell align="right">NGN</StyledTableCell>
              <StyledTableCell align="right">USD</StyledTableCell>
              <StyledTableCell align="right">GBP</StyledTableCell>
              <StyledTableCell align="right">EUR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
