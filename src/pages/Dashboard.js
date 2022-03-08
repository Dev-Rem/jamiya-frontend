import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import DashBoardContent from "../components/DashBoardContent";

function Dashboard() {
  return (
    <div>
      <ResponsiveDrawer>
        <DashBoardContent />
      </ResponsiveDrawer>
    </div>
  );
}

export default Dashboard;
