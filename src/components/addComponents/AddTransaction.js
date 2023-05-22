import React from "react";
import TransactionForm from "../utils/TF";

/* Exporting a function. */
export default function NewTransaction() {
  const [value, setValue] = React.useState({});

  return <TransactionForm data={value} use="create" />;
}
