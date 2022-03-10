import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import TransactionList from "../components/report/TransactionList";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
function createData(
  recieptNo,
  customerName,
  amountRecieved,
  amountGiven,
  amountTransfered,
  station
) {
  return {
    recieptNo,
    customerName,
    amountRecieved,
    amountGiven,
    amountTransfered,
    station,
  };
}

const rows = [
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "Front Desk"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "Online"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "Bank"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "Front Desk"),
  createData(34786, "Aremu Oluwaseyi", 500, 50000, 40000, "Front Desk"),
];
export default function TransactionLog() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters />
        <TransactionList data={rows} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
