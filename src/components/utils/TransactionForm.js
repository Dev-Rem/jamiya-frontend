import React from "react";
import MenuItem from "@mui/material/MenuItem";
import PageBox from "../utils/Box";
import FormStack from "../utils/FormStack";
import TextField from "@mui/material/TextField";
import { PurpleButton, CancelButton, DeleteButton } from "../utils/Button";

export default function TransactionForm(props) {
  const [value, setValue] = React.useState(props.data);
  const [use, setUse] = React.useState(props.use);
  const handleChange = (event) => {
    console.log(value);
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };
  return (
    <>
      <PageBox>
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Beneficiaries"
            value={value.beneficiaries}
            variant="standard"
            fullWidth
            name="beneficiaries"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="SINGLE_PAYMENT">SINGLE PAYMENT</MenuItem>
            <MenuItem value="DOUBLE_PAYMENT">DOUBLE PAYMENT</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Category"
            value={value.category}
            variant="standard"
            fullWidth
            name="category"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="PURCHASE">PURCHASE</MenuItem>
            <MenuItem value="SALES">SALES</MenuItem>
          </TextField>
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
            defaultValue={value.customer_name1}
          />
          <TextField
            id="standard-basic"
            label="Account Number"
            variant="standard"
            fullWidth
            name="account_number1"
            onChange={handleChange}
            size="small"
            defaultValue={value.account_number1}
          />
          <TextField
            id="standard-basic"
            label="Bank Name"
            fullWidth
            variant="standard"
            name="bank_name1"
            onChange={handleChange}
            defaultValue={value.bank_name1}
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
              defaultValue={value.customer_name2}
              size="small"
            />
            <TextField
              id="standard-basic"
              label="Account Number"
              variant="standard"
              fullWidth
              name="account_number2"
              onChange={handleChange}
              defaultValue={value.account_number2}
              size="small"
            />
            <TextField
              id="standard-basic"
              label="Bank Name"
              fullWidth
              variant="standard"
              name="bank_name2"
              onChange={handleChange}
              defaultValue={value.bank_name2}
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
            defaultValue={value.phone_number}
            size="small"
          />
          <TextField
            id="standard-basic"
            label="Address"
            variant="standard"
            fullWidth
            name="address"
            onChange={handleChange}
            defaultValue={value.address}
            size="small"
          />
          <TextField
            id="standard-select-currency"
            select
            label="Transfered to"
            value={value.transfered_to}
            variant="standard"
            fullWidth
            name="tansfered_to"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
            <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
            <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
            <MenuItem value="FCMB">FCMB</MenuItem>
          </TextField>
        </FormStack>
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Currency Recieved"
            value={value.currency_recieved}
            variant="standard"
            fullWidth
            name="currency_recieved"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="NAIRA">NAIRA</MenuItem>
            <MenuItem value="DOLLAR">DOLLAR</MenuItem>
            <MenuItem value="POUND">POUND</MenuItem>
            <MenuItem value="EURO">EURO</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Mode of Recieval"
            value={value.recieve_mode}
            variant="standard"
            fullWidth
            name="recieve_mode"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="CASH">CASH</MenuItem>
            <MenuItem value="TRANSFER">TRANSFER</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
          </TextField>
          <TextField
            id="standard-number"
            label="Amount Recieved"
            type="number"
            variant="standard"
            fullWidth
            name="amount_recieved"
            defaultValue={value.amount_recieved}
            onChange={handleChange}
            size="small"
          />

          <TextField
            id="standard-number"
            label="Rate"
            type="number"
            variant="standard"
            fullWidth
            size="small"
            name="rate"
            onChange={handleChange}
            defaultValue={value.rate}
          />
        </FormStack>
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Currency Given"
            value={value.currency_given}
            variant="standard"
            fullWidth
            name="currency_given"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="NAIRA">NAIRA</MenuItem>
            <MenuItem value="DOLLAR">DOLLAR</MenuItem>
            <MenuItem value="POUND">POUND</MenuItem>
            <MenuItem value="EURO">EURO</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Mode of Giving"
            value={value.give_mode}
            variant="standard"
            fullWidth
            name="give_mode"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="CASH">CASH</MenuItem>
            <MenuItem value="TRANSFER">TRANSFER</MenuItem>
            <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
          </TextField>
          <TextField
            id="standard-number"
            label="Amount Given"
            type="number"
            variant="standard"
            fullWidth
            name="amount_given"
            onChange={handleChange}
            value={value.cash_given}
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
            value={value.amount_transfered}
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
            value={value.description}
            size="small"
          />
        </FormStack>
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Initiator"
            value={value.initiator}
            variant="standard"
            fullWidth
            name="initiator"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="FRONTDESK">FRONT DESK</MenuItem>
            <MenuItem value="ONLINE">ONLINE</MenuItem>
            <MenuItem value="BANK">BANK</MenuItem>
            <MenuItem value="BANK">MARKETING</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Status"
            value={value.status}
            variant="standard"
            fullWidth
            name="status"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="SENT">CREATED</MenuItem>
            <MenuItem value="INITIATED">INITIATED</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Paid from"
            value={value.paid_from}
            variant="standard"
            fullWidth
            name="paid_from"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
            <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
            <MenuItem value="FCMB">FCMB</MenuItem>
          </TextField>
        </FormStack>
        <FormStack>
          {use === "create" ? (
            <>
              <PurpleButton name="Create" />
              <CancelButton name="Cancel" />
            </>
          ) : (
            <>
              {" "}
              <PurpleButton name="Edit" />
              <DeleteButton name="Delete" />
              <CancelButton name="Cancel" />
            </>
          )}
        </FormStack>
      </PageBox>
    </>
  );
}
