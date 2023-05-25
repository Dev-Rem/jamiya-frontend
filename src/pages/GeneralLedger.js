import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Accounts from "../components/ledgers/Account";
import Title from "../components/utils/Title";
import {
  LedgerVariables,
  ListLedger,
  ViewLedgerVariable,
} from "../components/ledgers/LedgerVariables";
import UpdateRate from "../components/ledgers/UpdateRate";

export function GeneralLedger() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Accounts" />
        <Accounts />
        <Title section="Ledger Variables" />
        <LedgerVariables />
        <Title section="Ledger List" />
        <ListLedger />
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

export function ViewGeneralLedger() {
  return (
    <div>
      <ResponsiveDrawer>
        <ViewLedgerVariable />
      </ResponsiveDrawer>
    </div>
  );
}
