import React from "react";
import TextField from "@mui/material/TextField";
import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
import FormStack from "../utils/FormStack";
import { axiosInstance } from "../utils/AxiosInstance";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom";

export function UpdateBalance() {
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
