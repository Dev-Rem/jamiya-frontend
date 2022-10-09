import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

function createData(date, customer_name, naira, dollar, pound, euro) {
  return {
    date,
    customer_name,
    naira,
    dollar,
    pound,
    euro,
  };
}

const rows = [
  createData("23/12/2021", "Aremu Oluwaseyi", 500, 500, 400, 200),
  createData("02/03/2022", "Aremu Oluwaseyi", 500, 500, 400, 200),
  createData("02/03/2022", "Aremu Oluwaseyi", 500, 500, 400, 200),
  createData("02/03/2022", "Aremu Oluwaseyi", 500, 500, 400, 200),
  createData("02/03/2022", "Aremu Oluwaseyi", 500, 500, 400, 200),
];

export function CustomerLedgerList() {
  const currentUrl = useLocation();
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Naira</TableCell>
            <TableCell align="right">Dollar</TableCell>
            <TableCell align="right">Pound</TableCell>
            <TableCell align="right">Euro</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.recieptNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.customer_name}</TableCell>
              <TableCell align="right">{row.naira}</TableCell>
              <TableCell align="right">{row.dollar}</TableCell>
              <TableCell align="right">{row.pound}</TableCell>
              <TableCell align="right">{row.euro}</TableCell>
              <TableCell alight="right">
                <Link
                  to={`${currentUrl.pathname}/view`}
                  style={{ textDecoration: "none" }}
                  state={{ row: row }} //https://ui.dev/react-router-pass-props-to-link
                >
                  <VisibilityIcon sx={{ color: "#bab8b8" }} />
                </Link>
              </TableCell>
            </TableRow>
          ))}

          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
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
  );
}
