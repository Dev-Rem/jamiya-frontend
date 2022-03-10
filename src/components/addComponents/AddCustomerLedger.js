import React from "react";
import PageBox from "../utils/Box";
import FormStack from "../utils/FormStack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { PurpleButton, CancelButton } from "../utils/Button";
export default function AddNewCustomerLedger(props) {
  const [value, setValue] = React.useState(props.customerLedger);

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
            id="outlined-select-currency"
            select
            label="Status"
            name="status"
            value={value.status}
            onChange={handleChange}
            fullWidth
            variant="standard"
          >
            <MenuItem value="RECIEVABLE">RECIEVABLE</MenuItem>
            <MenuItem value="PAYABLE">PAYABLE</MenuItem>
          </TextField>
          <TextField
            id="standard-basic"
            label="Customer Name"
            variant="standard"
            fullWidth
            name="customer"
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
            size="euro"
            name="rate"
            value={value.euro}
            onChange={handleChange}
          />
        </FormStack>
        <FormStack>
          <PurpleButton name="Add" />
          <CancelButton name="cancel" />
        </FormStack>
      </PageBox>
    </>
  );
}
