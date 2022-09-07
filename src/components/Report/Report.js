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
import { PurpleButton } from "../utils/Button";
import { Link, useLocation } from "react-router-dom";

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
  const [values, setValues] = React.useState(props.data);
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

export function Report(props) {
  const currentUrl = useLocation();
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
          <Link
            to={`${currentUrl.pathname}/#`}
            style={{ textDecoration: "none" }}
          >
            <PurpleButton name="New Report" />
          </Link>

          <Link
            to={`${currentUrl.pathname}/new-transaction`}
            style={{ textDecoration: "none" }}
          >
            <PurpleButton name="New Transaction" />
          </Link>
          <Link
            to={`${currentUrl.pathname}/update-balances`}
            style={{ textDecoration: "none" }}
          >
            <PurpleButton name="Update Balance" />
          </Link>
        </Stack>
      </Box>
      <ReportDetails data={props.data} />
    </div>
  );
}
