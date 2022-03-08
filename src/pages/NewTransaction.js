import React from "react";
import ResponsiveDrawer from "../components/AppBar";
import Title from "../components/Title";
import NewTransaction from "../components/AddNewTransaction";

export default function AddNew() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="New Transaction" />
        <NewTransaction/>
      </ResponsiveDrawer>{" "}
    </div>
  );
}
