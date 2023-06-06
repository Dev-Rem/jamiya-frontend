import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import CustomerLedger from "../components/ledgers/CustomerLedger";
import Title from "../components/utils/Title";
import {
  CustomerLedgerForm,
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

export function AddCustomerLedger() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Add New Customer Ledger" />
        <CustomerLedgerForm />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export function ViewCustomerLedger() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Edit Customer Ledger" />
        <CustomerLedgerForm />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
