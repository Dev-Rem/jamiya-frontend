import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Title from "../components/Title";
import { Filters } from "../components/Filters";
import ReportsList from "../components/ReportsList";
export default function Reports() {
  return (
    <div>
      <ResponsiveDrawer>
        <Title section="Reports" />
        <Filters />
        <ReportsList />
      </ResponsiveDrawer>
    </div>
  );
}
