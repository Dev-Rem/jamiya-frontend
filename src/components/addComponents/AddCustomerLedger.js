import React from "react";
import FormStack from "../utils/FormStack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { purpleButton, deleteButton, CancelButton } from "../utils/Button";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { axiosInstance } from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { currArray } from "../utils/Definitions";

export function CustomerLedgerForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(
    location.state === null
      ? {
          customer: "",
          currencies: {},
          description: "",
          status: "",
        }
      : location.state.row
  );

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

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/customerledgers/", value);
      navigate("/customer-ledger");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      navigate("/customer-ledger");

      const response = await axiosInstance.patch(
        `/customerledgers/${value.id}/`,
        value
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      navigate("/customer-ledger");
      const response = await axiosInstance.delete(
        `/customerledgers/${value.id}/`,
        value
      );
    } catch (error) {
      console.log(error);
    }
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
          value={value.customer}
        />
      </FormStack>
      <FormStack>
        <TextField
          id="standard-number"
          label="NGN"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="ngn"
          value={value.currencies.ngn}
          onChange={handleChange}
        />
        <TextField
          id="standard-number"
          label="USD"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="usd"
          value={value.currencies.usd}
          onChange={handleChange}
        />
        <TextField
          id="standard-number"
          label="GBP"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="gbp"
          value={value.currencies.gbp}
          onChange={handleChange}
        />
        <TextField
          id="standard-number"
          label="EUR"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="eur"
          value={value.currencies.eur}
          onChange={handleChange}
        />
      </FormStack>
      <FormStack>
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          fullWidth
          name="description"
          onChange={handleChange}
          size="small"
          value={value.description}
        />
      </FormStack>
      <FormStack>
        {location.state === null ? (
          <Button variant="text" type="submit" sx={purpleButton}>
            Add
          </Button>
        ) : (
          <>
            <Button variant="text" onClick={handleUpdate} sx={purpleButton}>
              Update
            </Button>
            <Button variant="text" sx={deleteButton} onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
        <CancelButton name="Cancel" />
      </FormStack>
    </Box>
  );
}
