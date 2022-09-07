import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import Title from "../components/utils/Title";
import {
  AddAccount,
  UpdateAccount,
} from "../components/addComponents/AddAccount";

const newAccount = {
  bank_name: "",
  account_name: "",
  naira: "",
  dollar: "",
  pound: "",
  euro: "",
};
const updateAccount = {
  bank_name: "Access bank",
  account_name: "Aremko Services",
  naira: "2342",
  dollar: "23413",
  pound: "34323",
  euro: "544532",
};
export function NewAccount() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Add Account" />
        <AddAccount data={newAccount} />
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
        <UpdateAccount data={updateAccount} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
