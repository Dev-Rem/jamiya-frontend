import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { PurpleButton, CancelButton } from "./utils/Button";
import PageBox from "./utils/Box";
import FormStack from "./utils/FormStack";

const currencies = [
  {
    value: "NAIRA",
    label: "₦",
  },
  {
    value: "DOLLAR",
    label: "$",
  },
  {
    value: "POUND",
    label: "£",
  },
  {
    value: "EURO",
    label: "€",
  },
];

const transaction = {
  beneficiaries: "",
  customer_name1: "",
  account_number1: "",
  bank_name1: "",
  customer_name2: "",
  account_number2: "",
  bank_name2: "",
  phone_number: "",
  address: "",
  transfered_to: "",
  currency_recieved: "",
  amount_recieved: 0,
  recieve_mode: "",
  rate: 0,
  give_mode: "",
  currency_given: "",
  cash_given: 0,
  amount_transfered: 0,
  description: "",
  initiator: "",
  status: "",
  category: "",
  profit: 0,
  paid_from: "",
  date_created: "",
};

export default function NewTransaction() {
  const [value, setValue] = React.useState(transaction);

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  return (
    <PageBox>
      <FormStack>
        <FormControl fullWidth>
          {" "}
          <InputLabel id="demo-simple-select-label">Beneficiaries</InputLabel>
          <Select
            name="beneficiaries"
            value={value.beneficiaries}
            onChange={handleChange}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            size="small"
          >
            <MenuItem value="SINGLE PAYMENT">SINGLE PAYMENT</MenuItem>
            <MenuItem value="DOUBLE PAYMENT">DOUBLE PAYMENT</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            name="category"
            value={value.category}
            onChange={handleChange}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            size="small"
          >
            <MenuItem value="PURCHASE">PURCHASE</MenuItem>
            <MenuItem value="SALES">SALES</MenuItem>
          </Select>
        </FormControl>
      </FormStack>
      <FormStack>
        <TextField
          id="standard-basic"
          label="Customer Name"
          variant="standard"
          fullWidth
          name="customer_name1"
          onChange={handleChange}
          size="small"
        />
        <TextField
          id="standard-basic"
          label="Account Number"
          variant="standard"
          fullWidth
          name="account_number1"
          onChange={handleChange}
          size="small"
        />
        <TextField
          id="standard-basic"
          label="Bank Name"
          fullWidth
          variant="standard"
          name="bank_name1"
          onChange={handleChange}
          size="small"
        />
      </FormStack>
      {value.beneficiaries === "DOUBLE PAYMENT" ? (
        <FormStack>
          <TextField
            id="standard-basic"
            label="Customer Name"
            variant="standard"
            fullWidth
            name="customer_name2"
            onChange={handleChange}
            size="small"
          />
          <TextField
            id="standard-basic"
            label="Account Number"
            variant="standard"
            fullWidth
            name="account_number2"
            onChange={handleChange}
            size="small"
          />
          <TextField
            id="standard-basic"
            label="Bank Name"
            fullWidth
            variant="standard"
            name="bank_name2"
            onChange={handleChange}
            size="small"
          />
        </FormStack>
      ) : (
        <></>
      )}
      <FormStack>
        <TextField
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          fullWidth
          name="phone_number"
          onChange={handleChange}
          size="small"
        />
        <TextField
          id="standard-basic"
          label="Address"
          variant="standard"
          fullWidth
          name="address"
          onChange={handleChange}
          size="small"
        />
      </FormStack>
      <FormStack>
        <TextField
          id="standard-select-currency"
          select
          label="Currency Recieved"
          value={value.currency}
          variant="standard"
          fullWidth
          name="currency_recieved"
          onChange={handleChange}
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label} {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-number"
          label="Amount Recieved"
          type="number"
          variant="standard"
          fullWidth
          name="amount_recieved"
          onChange={handleChange}
          size="small"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Mode of Recieval
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Mode of Recieval"
            value={value.recieve_mode}
            variant="standard"
            name="recieve_mode"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="CASH">CASH</MenuItem>
            <MenuItem value="TRANSFER">TRANSFER</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
          </Select>
        </FormControl>
      </FormStack>
      <FormStack>
        <TextField
          id="standard-number"
          label="Rate"
          type="number"
          variant="standard"
          fullWidth
          size="small"
          name="rate"
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mode of Giving</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Mode of Giving"
            onChange={handleChange}
            value={value.give_mode}
            variant="standard"
            name="give_mode"
            size="small"
          >
            <MenuItem value="CASH">CASH</MenuItem>
            <MenuItem value="TRANSFER">TRANSFER</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-number"
          label="Amount Given"
          type="number"
          variant="standard"
          fullWidth
          name="amount_given"
          onChange={handleChange}
          size="small"
        />
        <TextField
          id="standard-number"
          label="Amount Transfered"
          type="number"
          variant="standard"
          fullWidth
          name="amount_transfered"
          onChange={handleChange}
          size="small"
        />
      </FormStack>
      <FormStack>
        <TextField
          id="standard-number"
          label="Description"
          variant="standard"
          fullWidth
          name="description"
          onChange={handleChange}
          size="small"
        />
      </FormStack>
      <FormStack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Initiator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Initiator"
            value={value.initiator}
            variant="standard"
            name="initiator"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="FRONT DESK">FRONT DESK</MenuItem>
            <MenuItem value="ONLINE">ONLINE</MenuItem>
            <MenuItem value="BANK">BANK</MenuItem>
            <MenuItem value="BANK">MARKETING</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={value.status}
            variant="standard"
            name="status"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="CREATED">CREATED</MenuItem>
            <MenuItem value="INITIATED">INITIATED</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Paid from</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Paid from"
            value={value.paid_from}
            variant="standard"
            name="paid_from"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
            <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
            <MenuItem value="FCMB">FCMB</MenuItem>
          </Select>
        </FormControl>
      </FormStack>
      <FormStack>
        <PurpleButton name="create transaction" />
        <CancelButton name="Cancel" />
      </FormStack>
    </PageBox>
  );
}
