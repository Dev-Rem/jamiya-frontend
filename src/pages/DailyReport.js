import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/reports/ReportDetails";
import RecentTransactions from "../components/reports/RecentTransactions";
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
