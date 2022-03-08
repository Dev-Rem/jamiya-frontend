import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Report from "../components/Report/Report";
import RecentTransactions from "../components/Report/RecentTransactions";
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
