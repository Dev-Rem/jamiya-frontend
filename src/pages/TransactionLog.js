import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import {
  TransactionLogComponent,
  SearchedTransaction,
} from "../components/report/RecentTransactions";

export function TransactionLog() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters use="transactions" />
        <TransactionLogComponent />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export function SearchedTransactionResults() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Search Results" />
        <SearchedTransaction />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
