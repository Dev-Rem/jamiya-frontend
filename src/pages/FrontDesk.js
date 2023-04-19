import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/report/Report";
import RecentTransactions from "../components/report/RecentTransactions";
import Title from "../components/utils/Title";

function createData(name, naira, dollar, pound, euro) {
  return { name, naira, dollar, pound, euro };
}

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
