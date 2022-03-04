import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Report from "../components/Report";
import RecentTransactions from "../components/RecentTransactions";
import Title from "../components/Title";

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
