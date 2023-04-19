import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Accounts from "../components/ledgers/Account";
import Title from "../components/utils/Title";
import LedgerVariables from "../components/ledgers/LedgerVariables";
import UpdateRate from "../components/ledgers/UpdateRate";

export function GeneralLedger() {
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

export function Rate() {
  return (
    <div>
      <ResponsiveDrawer>
        <UpdateRate />
      </ResponsiveDrawer>
    </div>
  );
}
