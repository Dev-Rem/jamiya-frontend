import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import CustomerLedger from "../components/CustomerLedger";
import Title from "../components/Title";

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
