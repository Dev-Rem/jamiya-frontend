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

const currArray = ["naira", "dollar", "pound", "euro"];

export function NewCustomerLedger(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState({
    customer: "",
    currencies: { naira: 0.0, dollar: 0.0, pound: 0, euro: 0.0 },
    description: "",
    status: "",
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
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/customerledgers/", value);
      navigate("/customer-ledger");
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
          <Button variant="text" type="submit" sx={purpleButton}>
            Add
          </Button>
          <CancelButton name="cancel" />
        </FormStack>
      </Box>
    </>
  );
}

export function ViewEditDeleteCustomerLedger() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [value, setValue] = React.useState(data.row);

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
  };
  const handleSubmit = async () => {
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
          label="Naira"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="naira"
          value={value.currencies.naira}
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
          value={value.currencies.dollar}
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
          value={value.currencies.pound}
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
          value={value.currencies.euro}
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
        <Button variant="text" type="submit" sx={purpleButton}>
          Edit
        </Button>
        <Button variant="text" sx={deleteButton} onClick={handleDelete}>
          Delete
        </Button>
        <CancelButton name="Cancel" />
      </FormStack>
    </Box>
  );
}
