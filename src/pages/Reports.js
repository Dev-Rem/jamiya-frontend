import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import { ReportsList, SearchedReport } from "../components/report/ReportsList";
import { Report } from "../components/report/ReportDetails";

export function ReportList() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Report Log" />
        <Filters use="reports" />
        <ReportsList />
      </ResponsiveDrawer>
    </div>
  );
}

export function ReportDetails() {
  return (
    <ResponsiveDrawer>
      <Title section="Report Details" />
      <Report />
    </ResponsiveDrawer>
  );
}

export function SearchedReportResults() {
  return (
    <ResponsiveDrawer>
      <Title section="Report Search Results" />
      <SearchedReport />
    </ResponsiveDrawer>
  );
}
