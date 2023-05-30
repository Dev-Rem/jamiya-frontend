import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import Toolbar from "@mui/material/Toolbar";
import UpdateBalanceForm from "../components/report/UpdateBalanceForm";

export default function UpdateBalances() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Money In" />
        <UpdateBalanceForm use="moneyin" />
        <Toolbar />
        <Title section="Money Out" />
        <UpdateBalanceForm use="moneyout" />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
