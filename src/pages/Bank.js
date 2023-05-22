import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/report/Report";
import RecentTransactions from "../components/report/RecentTransactions";
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
