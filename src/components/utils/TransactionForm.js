import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormStack from "../utils/FormStack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purpleButton, CancelButton, deleteButton } from "../utils/Button";
import Box from "@mui/material/Box";
import { axiosInstance } from "./AxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
const trxx = {
  beneficiaries: "SINGLE_PAYMENT",
  customer_name1: "Aremu Oluwaseyi Festus",
  account_number1: "0235770003",
  bank_name1: "GTB",
  phone_number: "08034164740",
  address: "No. 5 Adiss Aluminium Crescent, Kubwa Anuja",
  rate: 575,

  receive_bank_name: "",
  receive_account_name: "",
  currency_recieved: "DOLLAR",
  cash_received: 0,
  recieve_mode: "CASH",
  receive_amount_transfered: 0,

  give_bank_name: "",
  give_account_name: "",
  give_mode: "CASH",
  currency_given: "NAIRA",
  cash_given: 57500,
  give_amount_transfered: 0,
  description: "TEST",
  initiator: "FRONTDESK",
  status: "SENT",
  categories: "PURCHASE",
  profit: 0.0,
};

export default function TransactionForm(props) {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const station = getStation(currentUrl);
  const [value, setValue] = React.useState(props.data);
  const [use, setUse] = React.useState(props.use);

  function getStation(currentUrl) {
    switch (currentUrl.pathname.split("/")[1]) {
      case "/frontdesk":
        return "FRONTDESK";
      case "/online":
        return "ONLINE";
      case "/bank":
        return "BANK";
      case "/marketing":
        return "MARKETING";
    }
  }

  const handleChange = (event) => {
    console.log(value);
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };
  const handleSubmit = async () => {
    try {
      const postTransaction = await axiosInstance.post("/transactions/", value);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (event) => {
    try {
      const updateTransaction = await axiosInstance.patch(
        `/transactions/${value.id}`,
        value
      );
      event.preventDefault();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (event) => {
    try {
      const deleteTransaction = await axiosInstance.delete(
        `/transactions/${value.id}`
      );
      event.preventDefault();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
  });

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
          {value.receipt_number ? (
            <TextField
              disabled
              id="standard-disabled"
              label="Receipt Number"
              defaultValue={value.receipt_number}
              variant="standard"
              fullWidth
            />
          ) : (
            <></>
          )}

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
            <MenuItem value="">CROSS CURRENCY</MenuItem>
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
        {value.beneficiaries === "DOUBLE_PAYMENT" ? (
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
        </FormStack>
        <FormStack>
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
            <MenuItem value="CASH_AND_TRANSFER">CASH AND TRANSFER</MenuItem>
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Currency Recieved"
            value={value.currency_received}
            variant="standard"
            fullWidth
            name="currency_received"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="NAIRA">NAIRA</MenuItem>
            <MenuItem value="DOLLAR">DOLLAR</MenuItem>
            <MenuItem value="POUND">POUND</MenuItem>
            <MenuItem value="EURO">EURO</MenuItem>
          </TextField>

          {value.recieve_mode === "CASH" ? (
            <TextField
              id="standard-number"
              label="Cash Amount"
              type="number"
              variant="standard"
              fullWidth
              name="cash_received"
              defaultValue={value.cash_received}
              onChange={handleChange}
              size="small"
            />
          ) : (
            <></>
          )}
          {value.recieve_mode === "TRANSFER" ||
          value.recieve_mode === "DEPOSIT" ? (
            <TextField
              id="standard-number"
              label="Transfer Amount"
              type="number"
              variant="standard"
              fullWidth
              name="receive_amount_transfered"
              defaultValue={value.receive_amount_transfered}
              onChange={handleChange}
              size="small"
            />
          ) : (
            <></>
          )}
          {value.recieve_mode === "CASH_AND_TRANSFER" ? (
            <>
              <TextField
                id="standard-number"
                label="Cash Amount"
                type="number"
                variant="standard"
                fullWidth
                name="cash_received"
                defaultValue={value.cash_received}
                onChange={handleChange}
                size="small"
              />
              <TextField
                id="standard-number"
                label="Transfer Amount"
                type="number"
                variant="standard"
                fullWidth
                name="receive_amount_transfered"
                defaultValue={value.receive_amount_transfered}
                onChange={handleChange}
                size="small"
              />
            </>
          ) : (
            <></>
          )}

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
        {value.recieve_mode === "TRANSFER" ||
        value.recieve_mode === "DEPOSIT" ||
        value.recieve_mode === "CASH_AND_TRANSFER" ? (
          <FormStack>
            <TextField
              id="standard-select-currency"
              select
              label="Bank name"
              value={value.bank_name}
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
            <TextField
              id="standard-select-currency"
              select
              label="Account name"
              value={value.account_name}
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
        ) : (
          <></>
        )}
        <FormStack></FormStack>
        <FormStack></FormStack>
        <FormStack></FormStack>

        <FormStack>
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
            <MenuItem value="CASH_AND_TRANSFER">CASH AND TRANSFER</MenuItem>
          </TextField>
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

          {value.give_mode === "CASH" ? (
            <TextField
              id="standard-number"
              label="Cash Amount"
              type="number"
              variant="standard"
              fullWidth
              name="cash_given"
              defaultValue={value.cash_given}
              onChange={handleChange}
              size="small"
            />
          ) : (
            <></>
          )}
          {value.give_mode === "TRANSFER" || value.give_mode === "DEPOSIT" ? (
            <TextField
              id="standard-number"
              label="Transfer Amount"
              type="number"
              variant="standard"
              fullWidth
              name="give_amount_transfered"
              defaultValue={value.give_amount_transfered}
              onChange={handleChange}
              size="small"
            />
          ) : (
            <></>
          )}
          {value.give_mode === "CASH_AND_TRANSFER" ? (
            <>
              <TextField
                id="standard-number"
                label="Cash Amount"
                type="number"
                variant="standard"
                fullWidth
                name="cash_given"
                defaultValue={value.cash_given}
                onChange={handleChange}
                size="small"
              />
              <TextField
                id="standard-number"
                label="Transfer Amount"
                type="number"
                variant="standard"
                fullWidth
                name="give_amount_transfered"
                defaultValue={value.give_amount_transfered}
                onChange={handleChange}
                size="small"
              />
            </>
          ) : (
            <></>
          )}
        </FormStack>
        {value.give_mode === "TRANSFER" ||
        value.give_mode === "DEPOSIT" ||
        value.give_mode === "CASH_AND_TRANSFER" ? (
          <FormStack>
            <TextField
              id="standard-select-currency"
              select
              label="Bank name"
              value={value.give_bank_name}
              variant="standard"
              fullWidth
              name="give_bank_name"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
              <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
              <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
              <MenuItem value="FCMB">FCMB</MenuItem>
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              label="Account name"
              value={value.give_account_name}
              variant="standard"
              fullWidth
              name="give_account_name"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="ZENITH BANK">ZENITH BANK</MenuItem>
              <MenuItem value="PROVIDUS BANK">PROVIDUS BANK</MenuItem>
              <MenuItem value="ACCESS BANK">ACCES BANK</MenuItem>
              <MenuItem value="FCMB">FCMB</MenuItem>
            </TextField>
          </FormStack>
        ) : (
          <></>
        )}
        <FormStack>
          <TextField
            id="standard-basic"
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
          {/* <TextField
            id="standard-basic"
            select
            label="Initiator"
            value={getStation}
            variant="standard"
            fullWidth
            name="initiator"
            onChange={handleChange}
            size="small"
          /> */}
          <TextField
            id="standard-basic"
            label="Initiator"
            variant="standard"
            fullWidth
            name="initiator"
            onChange={handleChange}
            size="small"
            defaultValue={station}
          />
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
        </FormStack>
        <FormStack>
          {use === "create" ? (
            <>
              <Button variant="text" type="submit" sx={purpleButton}>
                Create
              </Button>
              <CancelButton name="Cancel" />
            </>
          ) : (
            <>
              {" "}
              <Button variant="text" sx={purpleButton} onClick={handleUpdate}>
                Edit
              </Button>
              <Button
                variant="text"
                sx={purpleButton}
                onClick={() => {
                  navigate(`/${value.receipt_number}`);
                }}
              >
                Generate Receipt
              </Button>
              <Button variant="text" sx={deleteButton} onClick={handleDelete}>
                Delete
              </Button>
              <CancelButton name="Cancel" />
            </>
          )}
        </FormStack>
      </Box>
    </>
  );
}
