import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { Report } from "../components/report/Report";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import ReportsList from "../components/report/ReportsList";

export function Reports() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Report Log" />
        <Filters />
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
