import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import CustomerLedger from "../components/ledgers/CustomerLedger";
import Title from "../components/utils/Title";
import {
  NewCustomerLedger,
  ViewEditDeleteCustomerLedger,
} from "../components/addComponents/AddCustomerLedger";

export function CustomerLedgerPage() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Customer Ledger Report" />
        <CustomerLedger />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export function AddCustomerLedger(props) {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Add New Customer Ledger" />
        <NewCustomerLedger customerLedger={props} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export function ViewCustomerLedger() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Edit Customer Ledger" />
        <ViewEditDeleteCustomerLedger />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
