import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Report from "../components/Report/Report";
import RecentTransactions from "../components/Report/RecentTransactions";
import Title from "../components/utils/Title";

export default function Online() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Online Report" />
        <Report />
        <RecentTransactions />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
