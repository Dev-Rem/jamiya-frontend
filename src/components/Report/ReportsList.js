import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";

function createData(date, section, naira, dollar, pound, euro) {
  return { date, section, naira, dollar, pound, euro };
}

const rows = [
  createData("12/23/2012", "Front Desk", 6.0, 24, 4.0, 200),
  createData("12/23/2012", "Customer Ledger", 6.0, 24, 4.0, 200),
  createData("12/23/2012", "General Ledger", 6.0, 24, 4.0, 200),
  createData("12/23/2012", "Front Desk", 6.0, 24, 4.0, 200),
];

export default function BasicTable() {
  const currentUrl = useLocation();
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Section</TableCell>
            <TableCell align="right">Naira</TableCell>
            <TableCell align="right">Dollar</TableCell>
            <TableCell align="right">Pound</TableCell>
            <TableCell align="right">Euro</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {(() => {
                switch (row.section) {
                  case "Customer Ledger":
                    return (
                      <>
                        <TableCell component="th" scope="row">
                          <Link
                            to={`${currentUrl.pathname}/customer-ledger-details`}
                            style={{ textDecoration: "none", color: "#925098" }}
                          >
                            {row.date}
                          </Link>
                        </TableCell>
                      </>
                    );
                  case "General Ledger":
                    return (
                      <>
                        <TableCell component="th" scope="row">
                          <Link
                            to={`${currentUrl.pathname}/general-ledger-details`}
                            style={{ textDecoration: "none", color: "#925098" }}
                          >
                            {row.date}
                          </Link>
                        </TableCell>
                      </>
                    );

                  default:
                    return (
                      <>
                        <TableCell component="th" scope="row">
                          <Link
                            to={`${currentUrl.pathname}/report-details`}
                            style={{ textDecoration: "none", color: "#925098" }}
                          >
                            {row.date}
                          </Link>
                        </TableCell>
                      </>
                    );
                }
              })()}

              <TableCell align="right">{row.section}</TableCell>
              <TableCell align="right">{row.naira}</TableCell>
              <TableCell align="right">{row.dollar}</TableCell>
              <TableCell align="right">{row.pound}</TableCell>
              <TableCell align="right">{row.euro}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
