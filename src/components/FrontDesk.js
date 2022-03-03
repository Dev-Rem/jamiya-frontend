import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Report from "./Report";
import RecentTransactions from "./RecentTransactions";


function FrontDesk() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Report />
        <RecentTransactions />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export default FrontDesk;
