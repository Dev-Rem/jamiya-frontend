import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Report from "../components/report/Report";
import RecentTransactions from "../components/report/RecentTransactions";
import Title from "../components/utils/Title";

export default function Marketing() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Marketing Report" />
        <Report />
        <RecentTransactions />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
