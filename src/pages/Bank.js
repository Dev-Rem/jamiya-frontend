import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Report from "../components/Report/Report";
import RecentTransactions from "../components/Report/RecentTransactions";
import Title from "../components/utils/Title";

export default function Bank() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Bank Report" />
        <Report />
        <RecentTransactions />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
