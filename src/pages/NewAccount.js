import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import AddAccount from "../components/AddAccount";

export default function NewAccount() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Add Account" />
        <AddAccount />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
