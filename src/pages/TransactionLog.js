import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import TransactionList from "../components/TransactionList";
import Title from "../components/Title";
import { Filters } from "../components/Filters";

export default function TransactionLog() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters />
        <TransactionList />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
