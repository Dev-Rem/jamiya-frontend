import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/AxiosInstance";
import { NumericFormat } from "react-number-format";

function calcTotals(accounts) {
  const nairaTotal = accounts
    .map((account) => account.currencies.naira)
    .reduce((acc, curr) => acc + curr, 0);

  const dollarTotal = accounts
    .map((account) => account.currencies.dollar)
    .reduce((acc, curr) => acc + curr, 0);

  const poundTotal = accounts
    .map((account) => account.currencies.pound)
    .reduce((acc, curr) => acc + curr, 0);

  const euroTotal = accounts
    .map((account) => account.currencies.euro)
    .reduce((acc, curr) => acc + curr, 0);
  return { nairaTotal, dollarTotal, poundTotal, euroTotal };
}

function ListCustomerLedgers(props) {
  const currentUrl = useLocation();
  const data = props.ledger;
  const totals = props.totals;

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
                <TableCell>
                  <Link
                    to={`${currentUrl.pathname}/view`}
                    style={{ textDecoration: "none", color: "#C9037E" }}
                    state={{ row: row }} //https://ui.dev/react-router-pass-props-to-link
                  >
                    {row.date_created}
                  </Link>
                </TableCell>

                <TableCell align="right">{row.customer}</TableCell>
                <TableCell align="right">
                  <NumericFormat
                    value={row.currencies.naira}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#8358; {formattedValue}</span>
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumericFormat
                    value={row.currencies.dollar}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#36; {formattedValue}</span>
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumericFormat
                    value={row.currencies.pound}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#163; {formattedValue}</span>
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <NumericFormat
                    value={row.currencies.euro}
                    thousandSeparator={true}
                    displayType="text"
                    renderText={(formattedValue) => (
                      <span>&#128; {formattedValue}</span>
                    )}
                  />
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
                <NumericFormat
                  value={totals.nairaTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.dollarTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#36; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.poundTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#163; {formattedValue}</span>
                  )}
                />
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumericFormat
                  value={totals.euroTotal}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#128; {formattedValue}</span>
                  )}
                />
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
  const [totals, setTotals] = React.useState({});

  const getRecievables = async () => {
    const response = await axiosInstance.get(`/customerledgers`);
    const filteredResponse = response.data.results.filter((ledger) => {
      return ledger.status === "RECIEVABLE";
    });
    setTotals(calcTotals(filteredResponse));
    setRecievable(filteredResponse);
  };
  React.useEffect(() => {
    setTimeout(getRecievables, 2000);
  }, []);
  return (
    <>
      <ListCustomerLedgers ledger={receivable} totals={totals} />
    </>
  );
}

export function Payable() {
  const [payable, setPayable] = React.useState([]);
  const [totals, setTotals] = React.useState({});

  const getPayables = async () => {
    const response = await axiosInstance.get("/customerledgers");
    const filteredResponse = response.data.results.filter((ledger) => {
      return ledger.status === "PAYABLE";
    });
    setPayable(filteredResponse);

    setTotals(calcTotals(filteredResponse));
  };
  React.useEffect(() => {
    setTimeout(getPayables, 2000);
  }, []);
  return (
    <>
      <ListCustomerLedgers ledger={payable} totals={totals} />
    </>
  );
}
