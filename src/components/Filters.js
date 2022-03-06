import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export function SelectSection() {
  const [section, setSection] = React.useState("");

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 200, height: "inherit" }}
      direction="row"
    >
      <Select
        value={section}
        onChange={handleSectionChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
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
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField variant="standard" {...params} size="small" />
        )}
      />
    </LocalizationProvider>
  );
}
export function FilterButton() {
  return (
    <>
      <Button
        variant="text"
        sx={{
          bgcolor: "#c065c9",
          color: "#EBEBEB",
          "&:hover": {
            color: "#c065c9",
            backgroundColor: "#EBEBEB",
          },
        }}
      >
        Add Filter
      </Button>
    </>
  );
}
export function Filters() {
  return (
    <div>
      <Stack
        spacing={3}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ height: 30, mb:2 }}
      >
        <DatePicker />
        <SelectSection />
        <FilterButton />
      </Stack>
    </div>
  );
}
