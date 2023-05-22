import React from "react";
import { purpleButton } from "./Button";
import Button from "@mui/material/Button";
import { axiosInstance } from "./AxiosInstance";
import TextField from "@mui/material/TextField";
import FormStack from "./FormStack";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

export function Filters(props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate();

  const handleSearchTextChange = (event) => {
    const val = event.target.value;
    setSearchQuery(val);
  };
  const handleDateChange = (date) => {
    setSearchQuery(date.format("YYYY-MM-DD"));
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      if (props.use === "reports") {
        const response = await axiosInstance.get("/reports/", {
          params: {
            search: searchQuery,
          },
        });
        setSearchResults(response.data);
        navigate(`/${searchQuery}/report/search-results`, {
          state: { data: response.data },
        });
      }
      if (props.use === "transactions") {
        const response = await axiosInstance.get("/transactions", {
          params: {
            search: searchQuery,
          },
        });

        setSearchResults(response.data);
        navigate(`/${searchQuery}/transaction/search-results`, {
          state: { data: response.data },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        backgroundColor: "inherit",
        borderRadius: 1,
      }}
    >
      <FormStack>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          name="search"
          onChange={handleSearchTextChange}
          size="small"
          sx={{ mt: 0 }}
        />
        <Button variant="text" type="submit" sx={purpleButton}>
          Search by Text
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            format="YYYY-MM-DD"
            name="date"
            onChange={handleDateChange}
            slotProps={{ textField: { variant: "standard", size: "small" } }}
          />
        </LocalizationProvider>
        <Button variant="text" type="submit" sx={purpleButton}>
          Filter By Date
        </Button>
      </FormStack>
    </Box>
  );
}
