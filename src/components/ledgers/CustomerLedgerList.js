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
import { axiosInstance } from "../utils/AxiosInstance";

function ListCustomerLedgers(props) {
  const currentUrl = useLocation();
  const data = props.ledger;
  const nairaTotal = data.reduce(
    (accumulator, curentValue) => accumulator + curentValue["naira"],
    0
  );
  const dollarTotal = data.reduce(
    (accumulator, curentValue) => accumulator + curentValue["dollar"],
    0
  );

  const poundTotal = data.reduce(
    (accumulator, curentValue) => accumulator + curentValue["pound"],
    0
  );
  const euroTotal = data.reduce(
    (accumulator, curentValue) => accumulator + curentValue["euro"],
    0
  );
  return (
    <>
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
            {data.map((row) => (
              <TableRow
                key={row.recieptNo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.last_updated}</TableCell>
                <TableCell align="right">{row.customer}</TableCell>
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
                &#8358; {nairaTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#36; {dollarTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#163; {poundTotal}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                &#128; {euroTotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function Recievable() {
  const [receivable, setRecievable] = React.useState([]);

  const getRecievable = async () => {
    const receivableReq = await axiosInstance.get(
      "/customerledgers",
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setRecievable(
      receivableReq.data.results.filter((ledger) => {
        return ledger.status === "RECIEVABLE";
      })
    );
  };
  React.useEffect(() => {
    getRecievable();
  });
  return (
    <>
      <ListCustomerLedgers ledger={receivable} />
    </>
  );
}

export function Payable() {
  const [payable, setPayable] = React.useState([]);

  const getPayable = async () => {
    const payableReq = await axiosInstance.get(
      "/customerledgers",
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setPayable(
      payableReq.data.results.filter((ledger) => {
        return ledger.status === "PAYABLE";
      })
    );
  };
  React.useEffect(() => {
    getPayable();
  });
  return (
    <>
      <ListCustomerLedgers ledger={payable} />
    </>
  );
}
