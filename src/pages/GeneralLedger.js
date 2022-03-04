import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Accounts from "../components/Account";
import Title from "../components/Title";
import LedgerVariables from "../components/LedgerVariables";

export default function GeneralLedger() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="General Report" />
        <Accounts />
        <LedgerVariables />
      </ResponsiveDrawer>
    </div>
  );
}
