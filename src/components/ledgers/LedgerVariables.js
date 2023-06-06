import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import { styled, experimental_sx as sx } from "@mui/system";
import { axiosInstance } from "../utils/AxiosInstance";
import { NumericFormat } from "react-number-format";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import FormStack from "../utils/FormStack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#C9037F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  },
}));

export function LedgerVariables(props) {
  const [ledgerVariables, setLedgerVariables] = React.useState(
    props.data || {}
  );

  async function getLedgerVariables() {
    const ledgerData = {
      currencies: { ngn: 0.0, usd: 0.0, gbp: 0.0, eur: 0.0 },
      currency_total: 0.0,
      grand_total: 0.0,
      previous_total: 0.0,
      difference: 0.0,
      expense: 0.0,
      book_profit: 0.0,
      calculated_profit: 0.0,
      variance: 0.0,
    };

    const createdLedger = await axiosInstance.post(
      `/generalledger/`,
      ledgerData
    );
    const response = await axiosInstance.get(
      `/generalledger/${createdLedger.data.id}/`
    );
    setLedgerVariables(response.data);
  }
  React.useEffect(() => {
    if (props.data) {
    } else {
      setTimeout(getLedgerVariables, 1000);
    }
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableBody>
            <TableRow>
              <StyledTableCell>Currency Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.currency_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Grand Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.grand_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Previous Total</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.previous_total}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Difference</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.difference}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Expenses</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.expense}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> &#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Book Profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.book_profit}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Calculated profit</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.calculated_profit}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span>&#8358; {formattedValue}</span>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Variance</StyledTableCell>
              <Divider orientation="vertical" />
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", pt: 1, pb: 1 }}
              >
                <NumericFormat
                  value={ledgerVariables.variance}
                  thousandSeparator={true}
                  displayType="text"
                  renderText={(formattedValue) => (
                    <span> &#8358; {formattedValue}</span>
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

export function ListLedger() {
  const [ledgerVariables, setLedgerVariables] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const getLedgerVariables = async (page) => {
    const response = await axiosInstance.get(`/generalledger/`, {
      params: {
        page: page,
      },
    });
    setLedgerVariables(response.data.results);
    setTotalPages(Math.ceil(response.data.count / 10));
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getLedgerVariables(page);
  };
  React.useEffect(() => {
    setTimeout(getLedgerVariables, 1000);
  }, []);
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Previous Total</TableCell>
              <TableCell align="right">Currency Total</TableCell>
              <TableCell align="right">Grand Total</TableCell>
              <TableCell align="right">Calculated Profit</TableCell>
              <TableCell align="right">Variance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ledgerVariables === [] ? (
              <></>
            ) : (
              <>
                {ledgerVariables.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <>
                      <TableCell component="th" scope="row">
                        <Link
                          to={`/ledger-details`}
                          style={{
                            textDecoration: "none",
                            color: "#C9037F",
                          }}
                          state={{ ledger: row }}
                        >
                          {row.date_created}
                        </Link>
                      </TableCell>
                    </>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.previous_total}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.currency_total}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.grand_total}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <NumericFormat
                        value={row.calculated_profit}
                        thousandSeparator={true}
                        displayType="text"
                        renderText={(formattedValue) => (
                          <span>&#8358; {formattedValue}</span>
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.variance}
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
      <FormStack />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}

export function ViewLedgerVariable() {
  const location = useLocation();
  const data = location.state.ledger;
  return (
    <>
      <LedgerVariables data={data} />
    </>
  );
}
