import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Report from "../components/Report";
import RecentTransactions from "../components/RecentTransactions";
import Title from "../components/Title";

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
