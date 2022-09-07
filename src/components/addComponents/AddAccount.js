import React from "react";
import TextField from "@mui/material/TextField";
import { PurpleButton, CancelButton, DeleteButton } from "../utils/Button";
import PageBox from "../utils/Box";
import FormStack from "../utils/FormStack";

function AccountForm(props) {
  const [value, setValue] = React.useState(props.data);

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };
  return (
    <>
      <PageBox>
        <FormStack>
          {" "}
          <TextField
            name="bank_name"
            id="outlined-select-currency"
            label="Bank name"
            value={value.bank_name}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Account Name"
            variant="standard"
            fullWidth
            name="account_name"
            value={value.account_name}
            onChange={handleChange}
            size="small"
          />
        </FormStack>

        <FormStack>
          <TextField
            id="standard-number"
            label="Naira"
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="naira"
            value={value.naira}
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Dollar"
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="dollar"
            value={value.dollar}
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Pound"
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="pound"
            value={value.pound}
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Euro"
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="euro"
            value={value.euro}
            onChange={handleChange}
          />
        </FormStack>
      </PageBox>
    </>
  );
}
export function AddAccount(props) {
  return (
    <>
      <AccountForm data={props.data} />
      <FormStack>
        <PurpleButton name="Add" />
        <CancelButton name="cancel" />
      </FormStack>
    </>
  );
}
export function UpdateAccount(props) {
  return (
    <>
      <AccountForm data={props.data} />
      <FormStack>
        <PurpleButton name="Edit" />
        <DeleteButton name="Delete" />
        <CancelButton name="cancel" />
      </FormStack>
    </>
  );
}
