import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {PurpleButton} from "./Button";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";

export function SelectSection() {
  const [section, setSection] = React.useState("");

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 200 }} direction="row">
      <Select
        value={section}
        onChange={handleSectionChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ height: "30px" }}
      >
        <MenuItem value="">
          <em>Select Section</em>
        </MenuItem>
        <MenuItem value={10}>Front Desk</MenuItem>
        <MenuItem value={21}>Bank</MenuItem>
        <MenuItem value={22}>Online</MenuItem>
        <MenuItem value={22}>Marketing</MenuItem>
        <MenuItem value={22}>General Ledger</MenuItem>
        <MenuItem value={22}>CustomerLedger</MenuItem>
      </Select>
    </FormControl>
  );
}
export function DatePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ height: 20 }}>
      <DateRangePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        endText=""
        startText=""
        allowSameDateSelection="true"
        clearable="true"
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              variant="standard"
              {...startProps}
              size="small"
            />
            <Box sx={{ mx: 1 }}> to </Box>
            <TextField variant="standard" {...endProps} size="small" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

export function Filters() {
  return (
    <div>
      <Stack
        spacing={3}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ height: 30, mb: 2 }}
      >
        <SelectSection />
        <DatePicker />
        <PurpleButton name="add filter" />
      </Stack>
    </div>
  );
}
