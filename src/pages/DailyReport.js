import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/report/ReportDetails";
import RecentTransactions from "../components/report/RecentTransactions";
import Title from "../components/utils/Title";

function DailyReport() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Daily Report and Transactions" />
        <Report use="daily-report" />
        <RecentTransactions />
      </ResponsiveDrawer>
    </div>
  );
}

export default DailyReport;
