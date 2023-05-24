import React from "react";
import FormStack from "../utils/FormStack";
import TextField from "@mui/material/TextField";
import { purpleButton, CancelButton } from "../utils/Button";
import Button from "@mui/material/Button";
import { axiosInstance } from "../utils/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function MoneyIn() {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const [value, setValue] = React.useState({});

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: parseInt(val) };
    });
  };
  const handleSubmit = async () => {
    let id = currentUrl.state.reportId;
    navigate(-1);
    const moneyouts = await axiosInstance.patch(
      `/moneyouts/${id}/`,
      value,
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
  };
  return (
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
        <Button variant="text" type="submit" sx={purpleButton}>
          Uodate
        </Button>
        <CancelButton name="cancel" />
      </FormStack>
    </Box>
  );
}
