import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import AddNewCustomerLedger from "../components/addComponents/AddCustomerLedger";

export default function NewCustomerLedger(props) {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Add New Customer Ledger" />
        <AddNewCustomerLedger customerLedger={props.customerLedger} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
