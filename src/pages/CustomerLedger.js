import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import CustomerLedger from "../components/ledgers/CustomerLedger";
import Title from "../components/utils/Title";

export default function Hom() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Customer Ledger Report" />
        <CustomerLedger />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
