import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import { AccountForm } from "../components/addComponents/AddAccount";

export function NewAccount() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Add Account" />
        <AccountForm />
      </ResponsiveDrawer>{" "}
    </div>
  );
}

export function EditOrDeleteAccount() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Edit or Delete Account" />
        <AccountForm />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
