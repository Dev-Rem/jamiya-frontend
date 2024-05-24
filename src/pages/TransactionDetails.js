import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { ViewEditDeleteTransaction } from "../components/reports/TransactionList";

export function TransactionDetails() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Details" />
        <ViewEditDeleteTransaction />
      </ResponsiveDrawer>
    </div>
  );
}
