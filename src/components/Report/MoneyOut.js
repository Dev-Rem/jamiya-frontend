import React from "react";
import PageBox from "../utils/Box";
import FormStack from "../utils/FormStack";
import TextField from "@mui/material/TextField";
import { PurpleButton, CancelButton } from "../utils/Button";

const moneyOut = {
  naira: 100,
  dollar: 100,
  pound: 140,
  euro: 190,
};

export default function MoneyIn() {
  const [value, setValue] = React.useState(moneyOut);

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };
  return (
    <PageBox>
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
      <FormStack>
        <PurpleButton name="Update" />
        <CancelButton name="cancel" />
      </FormStack>
    </PageBox>
  );
}
