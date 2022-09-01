import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import ReportsList from "../components/Report/ReportsList";
export default function Reports() {
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
