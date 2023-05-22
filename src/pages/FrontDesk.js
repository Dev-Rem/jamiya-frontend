import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/report/Report";
import RecentTransactions from "../components/report/RecentTransactions";
import Title from "../components/utils/Title";

function FrontDesk() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Front Desk Report" />
        <Report />
        <RecentTransactions />
      </ResponsiveDrawer>
    </div>
  );
}

export default FrontDesk;
