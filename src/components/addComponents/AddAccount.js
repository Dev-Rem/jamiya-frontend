import React from "react";
import TextField from "@mui/material/TextField";
import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
import FormStack from "../utils/FormStack";
import { axiosInstance } from "../utils/AxiosInstance";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { currArray } from "../utils/Definitions";

export function AccountForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(() => {
    if (location.state == null) {
      return {
        bank_name: "",
        account_name: "",
        currencies: {},
      };
    } else {
      return location.state.account;
    }
  });

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    if (currArray.includes(key)) {
      setValue((prevState) => {
        return {
          ...prevState,
          currencies: { ...prevState.currencies, [key]: parseInt(val) },
        };
      });
    } else {
      setValue((prevState) => {
        return { ...prevState, [key]: val };
      });
    }
    console.log(value);
  };

  const handleSubmit = async (event) => {
    navigate("/general-ledger");
    try {
      const newAccount = await axiosInstance.post(`/accounts/`, value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    navigate("/general-ledger");
    try {
      const response = await axiosInstance.patch(
        `/accounts/${value.id}/`,
        value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/general-ledger");
      const response = await axiosInstance.delete(`/accounts/${value.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          {" "}
          <TextField
            name="bank_name"
            id="outlined-select-currency"
            label="Bank name"
            onChange={handleChange}
            value={value.bank_name}
            fullWidth
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Account Name"
            variant="standard"
            value={value.account_name}
            fullWidth
            name="account_name"
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
            value={value.currencies.ngn}
            fullWidth
            size="small"
            name="ngn"
            onChange={handleChange}
            defaultValue={0}
          />
          <TextField
            id="standard-number"
            label="Dollar"
            type="number"
            variant="standard"
            fullWidth
            value={value.currencies.usd}
            size="small"
            name="usd"
            onChange={handleChange}
            defaultValue={0}
          />
          <TextField
            id="standard-number"
            label="Pound"
            type="number"
            variant="standard"
            value={value.currencies.gbp}
            fullWidth
            size="small"
            name="gbp"
            onChange={handleChange}
            defaultValue={0}
          />
          <TextField
            id="standard-number"
            label="EUR"
            value={value.currencies.eur}
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="eur"
            onChange={handleChange}
            defaultValue={0}
          />
        </FormStack>
        <FormStack>
          {location.state == null ? (
            <Button variant="text" type="submit" sx={purpleButton}>
              Add
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={handleUpdate} sx={purpleButton}>
                Update
              </Button>
              <Button variant="text" onClick={handleDelete} sx={deleteButton}>
                Delete
              </Button>
            </>
          )}

          <CancelButton name="cancel" />
        </FormStack>
      </Box>
    </>
  );
}
