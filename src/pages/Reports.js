import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
/* Importing the Filters component from the Filters.js file in the utils folder. */
import { Filters } from "../components/utils/Filters";
/* Importing the ReportsList component from the ReportsList.js file in the Report folder. */
import ReportsList from "../components/Report/ReportsList";
/**
 * It returns a div that contains a ResponsiveDrawer component, which contains a Title component, a
 * Filters component, and a ReportsList component
 * @returns A div with a ResponsiveDrawer component, which contains a Title component, a Filters
 * component, and a ReportsList component.
 */
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
