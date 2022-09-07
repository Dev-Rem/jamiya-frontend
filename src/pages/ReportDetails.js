import React from "react";
import { ReportDetails as ReportDetail } from "../components/report/Report";
import Title from "../components/utils/Title";
import ResponsiveDrawer from "../components/appbar/AppBar";

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
export function ReportDetails() {
  return (
    <ResponsiveDrawer>
      <Title section="Report Details" />
      <ReportDetail data={data} />
    </ResponsiveDrawer>
  );
}

export function CustomerLedgerDetails() {
  return <></>;
}

export function GeneralLedgerDetails() {
  return <></>;
}
