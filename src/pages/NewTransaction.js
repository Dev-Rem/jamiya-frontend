import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import NewTransaction from "../components/AddTransaction";

export default function AddNew() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="New Transaction" />
        <NewTransaction />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
