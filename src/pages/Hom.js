import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Report from "../components/Report";
import RecentTransactions from "../components/RecentTransactions";

export default function Hom() {
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
