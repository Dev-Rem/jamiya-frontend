import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import {Report} from "../components/report/Report";
import RecentTransactions from "../components/report/RecentTransactions";
import Title from "../components/utils/Title";

function createData(name, naira, dollar, pound, euro) {
  return { name, naira, dollar, pound, euro };
}

const data = [
  createData("Opening Balance", 159, 6.0, 24, 4.0),
  createData("Money In", 237, 9.0, 37, 4.3),
  createData("Report Balance", 262, 16.0, 24, 6.0),
  createData("Money Out", 305, 3.7, 67, 4.3),
  createData("Closing Balance", 356, 16.0, 49, 3.9),
];

export default function Marketing() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Marketing Report" />
        <Report data={data} />
        <RecentTransactions />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
