import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import {
  TransactionLogComponent,
  SearchedTransaction,
} from "../components/reports/RecentTransactions";

export function TransactionLog() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters use="transactions" />
        <TransactionLogComponent use="transaction-log" />
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

export function MyTransactions() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="My Transactions" />
        <TransactionLogComponent use="my-transactions" />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
