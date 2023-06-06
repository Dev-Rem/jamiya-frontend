import React from "react";
import FormStack from "../utils/FormStack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purpleButton, CancelButton } from "../utils/Button";
import { axiosInstance } from "../utils/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function UpdateBalanceForm(props) {
  const locaction = useLocation();
  const [value, setValue] = React.useState({});

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: parseInt(val) };
    });

    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let id = locaction.state.reportId;
    if (props.use === "moneyin") {
      const response = await axiosInstance.patch(`/moneyins/${id}/`, value);
    } else {
      const response = await axiosInstance.patch(`/moneyouts/${id}/`, value);
    }
    window.location.reload();
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
          label="NGN"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="ngn"
          value={value.ngn}
          onChange={handleChange}
          defaultValue={0}
        />
        <TextField
          id="standard-number"
          label="USD"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="usd"
          value={value.usd}
          onChange={handleChange}
          defaultValue={0}
        />
        <TextField
          id="standard-number"
          label="GBP"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="gbp"
          value={value.gbp}
          onChange={handleChange}
          defaultValue={0}
        />
        <TextField
          id="standard-number"
          label="EUR"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="eur"
          value={value.eur}
          onChange={handleChange}
          defaultValue={0}
        />
      </FormStack>
      <FormStack>
        <Button variant="text" type="submit" sx={purpleButton}>
          Update
        </Button>
        <CancelButton name="cancel" />
      </FormStack>
    </Box>
  );
}
