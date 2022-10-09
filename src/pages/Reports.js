import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { ReportDetails as ReportDetail } from "../components/report/Report";
import Title from "../components/utils/Title";
/* Importing the Filters component from the Filters.js file in the utils folder. */
import { Filters } from "../components/utils/Filters";
/* Importing the ReportsList component from the ReportsList.js file in the Report folder. */
import ReportsList from "../components/report/ReportsList";
/**
 * It returns a div that contains a ResponsiveDrawer component, which contains a Title component, a
 * Filters component, and a ReportsList component
 * @returns A div with a ResponsiveDrawer component, which contains a Title component, a Filters
 * component, and a ReportsList component.
 */
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
