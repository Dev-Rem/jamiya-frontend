import React from "react";
import TextField from "@mui/material/TextField";
import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
import FormStack from "../utils/FormStack";
import { axiosInstance } from "../utils/AxiosInstance";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export function AddAccount() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  const handleSubmit = async (event) => {
    navigate("/general-ledger");
    try {
      const newAccount = await axiosInstance.post(
        `/accounts/`,
        value,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      console.log(newAccount.status);
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
            fullWidth
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Account Name"
            variant="standard"
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
            fullWidth
            size="small"
            name="naira"
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
            onChange={handleChange}
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
export function UpdateAccount(props) {
  const navigate = useNavigate();
  const location = useLocation();
  // const params = useParams();
  const [accountDetails, setAccountDetails] = React.useState(
    location.state.account
  );

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setAccountDetails((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  const handleSubmit = async () => {
    navigate("/general-ledger");
    try {
      const updatedAccount = await axiosInstance.patch(
        `/accounts/${accountDetails.id}/`,
        accountDetails
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/general-ledger");
      const accountToDelete = await axiosInstance.delete(
        `/accounts/${accountDetails.id}/`,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
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
            value={accountDetails.bank_name}
            fullWidth
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Account Name"
            variant="standard"
            value={accountDetails.account_name}
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
            value={accountDetails.naira}
            fullWidth
            size="small"
            name="naira"
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Dollar"
            type="number"
            variant="standard"
            fullWidth
            value={accountDetails.dollar}
            size="small"
            name="dollar"
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Pound"
            type="number"
            variant="standard"
            value={accountDetails.pound}
            fullWidth
            size="small"
            name="pound"
            onChange={handleChange}
          />
          <TextField
            id="standard-number"
            label="Euro"
            value={accountDetails.euro}
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="euro"
            onChange={handleChange}
          />
        </FormStack>
        <FormStack>
          <Button variant="text" type="submit" sx={purpleButton}>
            Edit
          </Button>
          <Button variant="text" onClick={handleDelete} sx={deleteButton}>
            Delete
          </Button>
          <CancelButton name="cancel" />
        </FormStack>
      </Box>
    </>
  );
}
