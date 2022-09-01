import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import MoneyIn from "../components/Report/MoneyIn";
import MoneyOut from "../components/Report/MoneyOut";
import Toolbar from "@mui/material/Toolbar";

export default function UpdateMoneyIn() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Money Out" />
        <MoneyIn />
        <Toolbar />
        <Title section="Money Out" />
        <MoneyOut />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
