import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import {
  AddAccount,
  UpdateAccount,
} from "../components/addComponents/AddAccount";

export function NewAccount() {
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

export function EditOrDeleteAccount() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Edit or Delete Account" />
        <UpdateAccount />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
