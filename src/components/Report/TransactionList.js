import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { viewTransaction } from "../../actions/transaction";
import { PurpleButton } from "../utils/Button";
import store from "../../store";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TransactionForm from "../utils/TransactionForm";

export function TransactionList() {
  const [data, setData] = React.useState();
  const transaction = useSelector((state) => {
    return state.transactions.transactionList;
  });

  const currentUrl = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setData(store.getState());
  }, [transaction]);
  console.log(data);
  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reciept No.</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Amount Recieved</TableCell>
              <TableCell align="right">Amount Given</TableCell>
              <TableCell align="right">Amount Transfered</TableCell>
              {transaction["data"]["results"][0].hasOwnProperty(
                "customer_phone"
              ) ? (
                <TableCell align="right">Customer Phone</TableCell>
              ) : (
                <TableCell align="right">Station</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {transaction["data"]["results"].map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.id}</TableCell>

                <TableCell align="right">{data.customer_name1}</TableCell>
                <TableCell align="right">{data.amount_recieved}</TableCell>
                <TableCell align="right">{data.cash_given}</TableCell>
                <TableCell align="right">{data.amount_transfered}</TableCell>
                {data.hasOwnProperty("customer_phone") ? (
                  <TableCell align="right">{data.customer_phone}</TableCell>
                ) : (
                  <TableCell align="right">{data.initiator}</TableCell>
                )}
                <TableCell alighn="right">
                  <Link
                    to={`${currentUrl.pathname}/view-transaction-details`}
                    onClick={() => {
                      dispatch(viewTransaction(data.id));
                    }}
                  >
                    <PurpleButton name="View" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ViewEditDeleteTransaction() {
  const [loading, setLoading] = React.useState(true);

  const transactionDetails = useSelector(
    (state) => state.transactions
  ).transactionDetails;

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Dialog>
          <DialogContent>
            <CachedRoundedIcon />
          </DialogContent>
        </Dialog>
      ) : (
        <TransactionForm data={transactionDetails} use="edit" />
      )}
    </>
  );
}
