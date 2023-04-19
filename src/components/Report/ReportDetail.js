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

  function createData(name, naira, dollar, pound, euro) {
    return { name, naira, dollar, pound, euro };
  }
  const getCompleteReport = async () => {
    try {
      const completeReport = await axiosInstance.get(
        `/reports/${localStorage.getItem("reportId")}/`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      console.log(completeReport);
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
              <StyledTableCell align="right">Naira</StyledTableCell>
              <StyledTableCell align="right">Dollar</StyledTableCell>
              <StyledTableCell align="right">Pound</StyledTableCell>
              <StyledTableCell align="right">Euro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
