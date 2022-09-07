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

function createData(bankName, accountName, naira, dollar, pound, euro) {
  return { bankName, accountName, naira, dollar, pound, euro };
}

const rows = [
  createData("Access bank", "Aremko Services", 159, 6.0, 24, 4.0),
  createData("Access bank", "Biscom Logistics", 159, 6.0, 24, 4.0),
  createData("Stanbic IBTC", "Jamiyafx  Enterprise", 159, 6.0, 24, 4.0),
  createData("FCMB", "JamiyaFX Enterprise", 159, 6.0, 24, 4.0),
  createData(
    "Zenith bank",
    "Jamiya Multi-Invesment Limited",
    159,
    6.0,
    24,
    4.0
  ),
];

export default function Account() {
  const currentUrl = useLocation();
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
            to={`${currentUrl.pathname}/#`}
            style={{ textDecoration: "none" }}
          >
            <PurpleButton name="new report" />
          </Link>
          <Link
            to={`${currentUrl.pathname}/add-account`}
            style={{ textDecoration: "none" }}
          >
            <PurpleButton name="add account" />
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
            {rows.map((row) => (
              <StyledTableRow key={row.accountName}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`${currentUrl.pathname}/update-account`}
                    style={{ textDecoration: "none", color: "#925098" }}
                  >
                    {row.bankName}
                  </Link>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.accountName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#8358; {row.naira}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#36; {row.dollar}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  &#163; {row.pound}
                </StyledTableCell>
                <StyledTableCell align="right">
                  &#128; {row.euro}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#8358; 3000
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#36; 3000
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#163; 3000
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#128; 3000
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
