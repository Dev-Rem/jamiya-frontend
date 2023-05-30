import React from "react";
import TextField from "@mui/material/TextField";
import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
import FormStack from "../utils/FormStack";
import { axiosInstance } from "../utils/AxiosInstance";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function UpdateRate() {
  const navigate = useNavigate();
  const [rates, setRates] = React.useState({});

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setRates((prevState) => {
      if (key === "buying" || key === "selling") {
        return { ...prevState, [key]: parseInt(val) };
      }
      return { ...prevState, [key]: val };
    });
  };

  const handleSubmit = (event) => {
    try {
      const createdRates = axiosInstance.patch(
        "/rates/1/",
        rates,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      event.preventDefault();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          padding: 3,
        }}
      >
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Currency"
            value={rates.currency}
            variant="standard"
            fullWidth
            name="currency"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="ngn">NGN</MenuItem>
            <MenuItem value="usd">USD</MenuItem>
            <MenuItem value="gbp">GBP</MenuItem>
            <MenuItem value="eur">EUR</MenuItem>
          </TextField>
          <TextField
            id="standard-number"
            type="number"
            name="buying"
            label="Buying"
            onChange={handleChange}
            value={rates.buying}
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="selling"
            id="outlined-select-currency"
            label="Selling"
            onChange={handleChange}
            value={rates.selling}
            fullWidth
            type="number"
            variant="standard"
          />
        </FormStack>
        <FormStack>
          <Button variant="text" type="submit" sx={purpleButton}>
            Update
          </Button>
          <CancelButton name="cancel" />
        </FormStack>
      </Box>
    </div>
  );
}
