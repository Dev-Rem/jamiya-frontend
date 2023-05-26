import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TransactionForm from "../utils/TF";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormStack from "../utils/FormStack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { purpleButton, CancelButton } from "../utils/Button";

export function TransactionList(props) {
  const data = props.data;
  const currentUrl = useLocation();

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell align="right">Reciept Number</TableCell>
              <TableCell align="right">Station</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data === [] ? (
              <></>
            ) : (
              <>
                {data.map((data) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ color: "#C9037F" }}>
                      <Link
                        to={`/${data.receipt_number}/view-transaction`}
                        style={{ textDecoration: "none", color: "#c9037e" }}
                        state={{ data: data }} //https://ui.dev/react-router-pass-props-to-link
                      >
                        {data.serial_number}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{data.receipt_number}</TableCell>
                    <TableCell align="right">{data.initiator}</TableCell>
                    <TableCell align="right">{data.category}</TableCell>
                    <TableCell align="right">{data.phone_number}</TableCell>
                    <TableCell align="right"> {data.date_created}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const ViewTransaction = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "white",
          alignContent: "right",
          padding: 2,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {" "}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="body1">
              Receipt Number:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.receipt_number}{" "}
              </Typography>
            </Typography>{" "}
            <Typography variant="body1">
              Category:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.category}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Beneficiaries:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.payment_status}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Initiator:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.initiator}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="body1">
              Profit:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.profit}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Status:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.status}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Description:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.description}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Customer Phone Number:{" "}
              <Typography
                variant="subtitle2"
                fullWidth
                component="span"
                style={{ display: "inline" }}
              >
                {data.phone_number}
              </Typography>
            </Typography>
          </Grid>
          {data.beneficiaries.map((entry) => (
            <Grid item xs={12} sm={3} md={3}>
              <Typography variant="body1">
                Customer Name:{" "}
                <Typography
                  variant="subtitle2"
                  fullWidth
                  component="span"
                  style={{ display: "inline" }}
                >
                  {entry.customer_account_name}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Account Number:{" "}
                <Typography
                  variant="subtitle2"
                  fullWidth
                  component="span"
                  style={{ display: "inline" }}
                >
                  {entry.customer_account_number}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Bank Name:{" "}
                <Typography
                  variant="subtitle2"
                  fullWidth
                  component="span"
                  style={{ display: "inline" }}
                >
                  {entry.customer_bank_name}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Amount:{" "}
                <Typography
                  variant="subtitle2"
                  fullWidth
                  component="span"
                  style={{ display: "inline" }}
                >
                  {entry.amount}
                </Typography>
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.receive_give.map((entry) => (
            <Grid item xs={12} sm={12} md={6}>
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <FormStack>
                  <Typography variant="h6">
                    Status:{" "}
                    <Typography
                      variant="subtitle1"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      {entry.status}
                    </Typography>
                  </Typography>

                  <Typography variant="h6">
                    Mode:{" "}
                    <Typography
                      variant="subtitle1"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      {entry.mode}
                    </Typography>
                  </Typography>

                  <Typography variant="h6">
                    Currency:{" "}
                    <Typography
                      variant="subtitle1"
                      component="span"
                      style={{ display: "inline" }}
                    >
                      {entry.currency}
                    </Typography>
                  </Typography>
                </FormStack>
                <FormStack>
                  {entry.cash ? (
                    <Typography variant="h6">
                      Cash Amount:{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.cash}
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}
                  {entry.cash_rate ? (
                    <Typography variant="h6">
                      Cash Rate:{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.cash_rate}
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {entry.transfer ? (
                    <Typography variant="h6">
                      Transfer Amount:
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.transfer}
                      </Typography>{" "}
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {entry.transfer_rate ? (
                    <Typography variant="h6">
                      Transfer Rate:{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.transfer_rate}
                      </Typography>{" "}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </FormStack>
                <FormStack>
                  {entry.bank_name ? (
                    <Typography variant="h6">
                      Bank Name:{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.bank_name}
                      </Typography>{" "}
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {entry.account_name ? (
                    <Typography variant="h6">
                      Account Name:{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {entry.account_name}
                      </Typography>
                    </Typography>
                  ) : (
                    <></>
                  )}
                </FormStack>
              </div>
            </Grid>
          ))}
        </Grid>

        <br />
        <FormStack>
          <Button
            variant="text"
            sx={purpleButton}
            onClick={() => {
              navigate(`/${data.receipt_number}/transaction-receipt`, {
                state: { data: data },
              });
            }}
          >
            Generate Receipt
          </Button>
          <CancelButton name="Cancel" />
        </FormStack>
      </Box>
    </>
  );
};

export function ViewEditDeleteTransaction() {
  const location = useLocation();
  const data = location.state.data;
  return (
    <>
      {JSON.parse(localStorage.getItem("user")).is_admin === true ? (
        <TransactionForm data={data} use="edit" />
      ) : (
        <ViewTransaction data={data} />
      )}
    </>
  );
}
