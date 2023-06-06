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
import Pagination from "@mui/material/Pagination";
import FormStack from "../utils/FormStack";
import { NumericFormat } from "react-number-format";

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
