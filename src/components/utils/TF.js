import React, { Fragment } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormStack from "./FormStack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purpleButton, CancelButton, deleteButton } from "./Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { axiosInstance } from "./AxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const beneficiaryFormData = {
  customer_account_name: "",
  customer_account_number: "",
  customer_bank_name: "",
  amount: 0.0,
};
const receiveGiveFormData = {
  status: "",
  bank_name: "",
  account_name: "",
  currency: "",
  cash: 0.0,
  mode: "",
  transfer: 0.0,
  cash_rate: 0.0,
  transfer_rate: 0.0,
  selling_rate: 0.0,
};
const transactionData = {
  phone_number: "",
  description: "",
  initiator: "",
  status: "SENT",
  category: "PURCHASE",
  profit: 0.0,
  payment_status: "SINGLE PAYMENT",
};
const num = [
  "cash",
  "transfer",
  "transfer_rate",
  "cash_rate",
  "selling_rate",
  "transfer_amount1",
  "transfer_amount2",
];
const commercialBanks = [
  "Access Bank Plc",
  "Fidelity Bank Plc",
  "First City Monument Bank Limited",
  "First Bank of Nigeria Limited",
  "Guaranty Trust Holding Company Plc",
  "Union Bank of Nigeria Plc",
  "United Bank for Africa Plc",
  "Zenith Bank Plc",
  "Citibank Nigeria Limited",
  "Ecobank Nigeria",
  "Heritage Bank Plc",
  "Keystone Bank Limited",
  "Optimus Bank Limited",
  "Polaris Bank Limited. The successor to Skye Bank Plc.",
  "Stanbic IBTC Bank Plc",
  "Standard Chartered",
  "Sterling Bank Plc",
  "Titan Trust bank",
  "Unity Bank Plc",
  "Wema Bank Plc",
  "Globus Bank Limited",
  "Parallex Bank Limited",
  "PremiumTrust Bank Limited",
  "Providus Bank Limited",
  "SunTrust Bank Nigeria Limited",
  "Jaiz Bank Plc",
  "LOTUS BANK",
  "TAJ Bank Limited",
  "FairMoney Microfinance Bank",
  "Sparkle Bank",
  "Kuda Bank",
  "Moniepoint Microfinance Bank",
  "Opay",
  "Palmpay",
  "Rubies Bank",
  "VFD Microfinance Bank",
  "Mint Finex MFB",
  "Mkobo MFB",
  "Raven bank",
  "Rex Microfinance Bank",
  "Coronation Merchant Bank",
  "FBNQuest Merchant Bank",
  "FSDH Merchant Bank",
  "Rand Merchant Bank",
  "Nova Merchant Bank",
  "SunTrust Bank Nigeria limited",
  "Stanbic Ibtc",
];

export default function TransactionForm(props) {
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const [station, setStation] = React.useState(getStation(currentUrl));
  const [use, setUse] = React.useState(props.use);
  const [accounts, setAccounts] = React.useState([]);

  const [transaction, setTransaction] = React.useState(() => {
    if (use === "create") {
      return transactionData;
    } else {
      return props.data;
    }
  });

  const [beneficiaries, setBeneficiaries] = React.useState(() => {
    if (use === "create") {
      return [beneficiaryFormData];
    } else {
      return props.data.beneficiaries;
    }
  });
  const [receiveGiveFormList, setReceiveGiveFormList] = React.useState(() => {
    if (use === "create") {
      return [receiveGiveFormData, receiveGiveFormData];
    } else {
      return props.data.receive_give;
    }
  });

  function getStation(currentUrl) {
    switch (currentUrl.pathname.split("/")[1]) {
      case "frontdesk":
        return "FRONTDESK";
      case "online":
        return "ONLINE";
      case "bank":
        return "BANK";
      case "marketing":
        return "MARKETING";
    }
  }

  async function getAccounts() {
    const response = await axiosInstance.get("/accounts/");
    setAccounts(response.data.results);
  }
  const handleTransactionChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;

    if (val === "DOUBLE PAYMENT") {
      setBeneficiaries((prevState) => [...prevState, beneficiaryFormData]);
    }
    if (val === "SINGLE PAYMENT" && beneficiaries.length === 2) {
      setBeneficiaries((prevState) => {
        const updatedForms = [...prevState];
        updatedForms.pop();
        return updatedForms;
      });
    }

    setTransaction((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  const handleReceiveGiveForm = (event, index) => {
    const { name, value } = event.target;
    setReceiveGiveFormList((prevState) => {
      const updatedForms = [...prevState];
      if (num.includes(name)) {
        updatedForms[index] = {
          ...updatedForms[index],
          [name]: parseInt(value),
        };
      } else {
        updatedForms[index] = { ...updatedForms[index], [name]: value };
      }

      return updatedForms;
    });
  };

  const handleBeneficiariesForm = (event, index) => {
    const { name, value } = event.target;
    setBeneficiaries((prevState) => {
      const updatedForms = [...prevState];
      if (num.includes(name)) {
        updatedForms[index] = {
          ...updatedForms[index],
          [name]: parseInt(value),
        };
      } else {
        updatedForms[index] = { ...updatedForms[index], [name]: value };
      }
      return updatedForms;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/transactions/", {
        ...transaction,
        beneficiaries,
        receive_give: receiveGiveFormList,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    try {
      const response = await axiosInstance.patch(
        `/transactions/${transaction.id}/`,
        {
          ...transaction,
          beneficiaries,
          receive_give: receiveGiveFormList,
        }
      );
      event.preventDefault();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (event) => {
    try {
      const response = await axiosInstance.delete(
        `/transactions/${transaction.id}/`
      );
      event.preventDefault();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const transactionCalculation = () => {
    var receiveTotal = 0;
    var giveTotal = 0;
    var receiving = receiveGiveFormList.filter(
      (receive) => receive.status === "RECEIVING"
    );
    var giving = receiveGiveFormList.filter((give) => give.status === "GIVING");

    receiving.forEach((receive) => {
      if (receive.cash_rate > 0) {
        var cash = receive.cash * receive.cash_rate;
        receiveTotal = receiveTotal + cash;
      } else {
        receiveTotal = receiveTotal + receive.cash;
      }
      if (receive.transfer_rate > 0) {
        var transfer = receive.transfer * receive.transfer_rate;
        receiveTotal = receiveTotal + transfer;
      } else {
        receiveTotal = receiveTotal + receive.transfer;
      }
    });

    giving.forEach((give) => {
      if (give.cash_rate > 0) {
        var cash = give.cash * give.cash_rate;
        giveTotal = giveTotal + cash;
      } else {
        giveTotal = giveTotal + give.cash;
      }
      if (give.transfer_rate > 0) {
        var transfer = give.transfer / give.transfer_rate;
        giveTotal = giveTotal + give.transfer;
      } else {
        giveTotal = giveTotal + give.transfer;
      }
    });

    let balance = receiveTotal - giveTotal;

    return { receiveTotal, giveTotal, balance };
  };

  React.useEffect(() => {
    setTimeout(() => {
      getAccounts();
    }, 5000);
    // console.log({
    //   ...transaction,
    //   beneficiaries,
    //   receive_give: receiveGiveFormList,
    // });
    setStation(getStation(currentUrl));
  }, [accounts]);
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
          <TextField
            id="standard-select-currency"
            select
            label="Category"
            value={transaction.category}
            variant="standard"
            fullWidth
            name="category"
            onChange={handleTransactionChange}
            size="small"
            required
          >
            <MenuItem value="PURCHASE">PURCHASE</MenuItem>
            <MenuItem value="SALES">SALES</MenuItem>
            <MenuItem value="CROSS CURRENCY">CROSS CURRENCY</MenuItem>
          </TextField>
        </FormStack>
        <FormStack>
          <Typography variant="h6">Receiving and Giving</Typography>
          {receiveGiveFormList.length === 8 ? (
            <IconButton disabled color="inherit" sx={{ m: 0, p: 0 }}>
              <AddCircleOutlineIcon sx={{ mt: 0.7 }} />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              sx={{ m: 0, p: 0 }}
              onClick={() => {
                setReceiveGiveFormList((prevState) => [
                  ...prevState,
                  receiveGiveFormData,
                ]);
              }}
            >
              <AddCircleOutlineIcon sx={{ mt: 0.7 }} />
            </IconButton>
          )}
        </FormStack>
        <FormStack></FormStack>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {receiveGiveFormList.map((receiveGiveForm, index) => (
            <Grid item xs={12} sm={12} md={6}>
              <div
                key={index}
                style={{
                  backgroundColor: "#F4F4F4",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <FormStack>
                  <TextField
                    id="standard-select-currency"
                    label="Status"
                    value={receiveGiveForm["status"] || ""}
                    variant="standard"
                    fullWidth
                    name="status"
                    size="small"
                    onChange={(event) => handleReceiveGiveForm(event, index)}
                    select
                    required
                  >
                    <MenuItem value="RECEIVING">RECEIVING</MenuItem>
                    <MenuItem value="GIVING">GIVING</MenuItem>
                  </TextField>

                  <TextField
                    id="standard-select-currency"
                    select
                    label="Mode"
                    value={receiveGiveForm["mode"] || ""}
                    variant="standard"
                    fullWidth
                    name="mode"
                    onChange={(event) => handleReceiveGiveForm(event, index)}
                    size="small"
                    required
                  >
                    <MenuItem value="CASH">CASH</MenuItem>
                    <MenuItem value="TRANSFER">TRANSFER</MenuItem>
                    <MenuItem value="DEPOSIT">DEPOSIT</MenuItem>
                    <MenuItem value="CASH AND TRANSFER">
                      CASH AND TRANSFER
                    </MenuItem>
                  </TextField>

                  <TextField
                    id="standard-select-currency"
                    select
                    label="Currency"
                    value={receiveGiveForm["currency"] || ""}
                    defaultValue="NAIRA"
                    variant="standard"
                    fullWidth
                    name="currency"
                    onChange={(event) => handleReceiveGiveForm(event, index)}
                    size="small"
                    required
                  >
                    <MenuItem value="NAIRA">NAIRA</MenuItem>
                    <MenuItem value="DOLLAR">DOLLAR</MenuItem>
                    <MenuItem value="POUND">POUND</MenuItem>
                    <MenuItem value="EURO">EURO</MenuItem>
                  </TextField>
                </FormStack>

                {receiveGiveForm.mode ? (
                  <>
                    <FormStack>
                      {receiveGiveForm.mode === "TRANSFER" ||
                      receiveGiveForm.mode === "DEPOSIT" ? (
                        <></>
                      ) : (
                        <>
                          <TextField
                            id="standard-number"
                            label="Cash Amount"
                            type="number"
                            variant="standard"
                            fullWidth
                            name="cash"
                            value={receiveGiveForm["cash"] || ""}
                            onChange={(event) =>
                              handleReceiveGiveForm(event, index)
                            }
                            size="small"
                            required
                          />

                          {(receiveGiveForm.status === "GIVING" &&
                            transaction.category === "PURCHASE") ||
                          (transaction.category === "SALES" &&
                            receiveGiveForm.status === "RECEIVING") ? (
                            <></>
                          ) : (
                            <>
                              <TextField
                                id="standard-number"
                                label="Cash Rate"
                                type="number"
                                variant="standard"
                                fullWidth
                                size="small"
                                name="cash_rate"
                                required
                                onChange={(event) =>
                                  handleReceiveGiveForm(event, index)
                                }
                                value={receiveGiveForm["cash_rate"] || ""}
                              />
                            </>
                          )}
                        </>
                      )}
                      {receiveGiveForm.mode === "CASH" ? (
                        <></>
                      ) : (
                        <>
                          <TextField
                            id="standard-number"
                            label="Transfer Amount"
                            type="number"
                            variant="standard"
                            required
                            fullWidth
                            name="transfer"
                            value={receiveGiveForm["transfer"] || ""}
                            onChange={(event) =>
                              handleReceiveGiveForm(event, index)
                            }
                            size="small"
                          />

                          {(receiveGiveForm.status === "GIVING" &&
                            transaction.category === "PURCHASE") ||
                          (transaction.category === "SALES" &&
                            receiveGiveForm.status === "RECEIVING") ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <TextField
                                id="standard-number"
                                label="Transfer Rate"
                                type="number"
                                variant="standard"
                                required
                                fullWidth
                                size="small"
                                name="transfer_rate"
                                onChange={(event) =>
                                  handleReceiveGiveForm(event, index)
                                }
                                value={receiveGiveForm["transfer_rate"] || ""}
                              />
                            </>
                          )}
                        </>
                      )}
                    </FormStack>
                    {receiveGiveForm.mode === "CASH" ||
                    receiveGiveForm.status === "GIVING" ? (
                      props.use === "create" ? (
                        <></>
                      ) : (
                        <>
                          <FormStack>
                            <TextField
                              id="standard-select-currency"
                              select
                              label="Bank name"
                              value={receiveGiveForm["bank_name"] || ""}
                              variant="standard"
                              fullWidth
                              required
                              name="bank_name"
                              onChange={(event) =>
                                handleReceiveGiveForm(event, index)
                              }
                              size="small"
                            >
                              {accounts.map((account) => (
                                <MenuItem value={account.bank_name}>
                                  {account.bank_name}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id="standard-select-currency"
                              select
                              label="Account name"
                              value={receiveGiveForm["account_name"] || ""}
                              variant="standard"
                              fullWidth
                              required
                              name="account_name"
                              onChange={(event) =>
                                handleReceiveGiveForm(event, index)
                              }
                              size="small"
                            >
                              {accounts.map((account) => (
                                <MenuItem value={account.account_name}>
                                  {account.account_name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </FormStack>
                        </>
                      )
                    ) : (
                      <FormStack>
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Bank name"
                          value={receiveGiveForm["bank_name"] || ""}
                          variant="standard"
                          fullWidth
                          required
                          name="bank_name"
                          onChange={(event) =>
                            handleReceiveGiveForm(event, index)
                          }
                          size="small"
                        >
                          {accounts.map((account) => (
                            <MenuItem value={account.bank_name}>
                              {account.bank_name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="standard-select-currency"
                          select
                          label="Account name"
                          value={receiveGiveForm["account_name"] || ""}
                          variant="standard"
                          fullWidth
                          required
                          name="account_name"
                          onChange={(event) =>
                            handleReceiveGiveForm(event, index)
                          }
                          size="small"
                        >
                          {accounts.map((account) => (
                            <MenuItem value={account.account_name}>
                              {account.account_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormStack>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {receiveGiveFormList.length === 2 ? (
                  <IconButton color="inherit" sx={{ m: 0, p: 0 }} disabled>
                    <RemoveCircleOutlineIcon sx={{ mt: 0.7 }} />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    sx={{ m: 0, p: 0 }}
                    onClick={() => {
                      setReceiveGiveFormList((prevState) => {
                        const updatedForms = [...prevState];
                        updatedForms.splice(index, 1);
                        return updatedForms;
                      });
                    }}
                  >
                    <RemoveCircleOutlineIcon sx={{ mt: 0.7 }} />
                  </IconButton>
                )}
              </div>
            </Grid>
          ))}
        </Grid>

        <FormStack>
          <Typography variant="h6">Beneficiaries</Typography>
        </FormStack>
        <FormStack>
          <TextField
            id="standard-select-currency"
            select
            label="Beneficiaries"
            value={transaction.payment_status}
            variant="standard"
            fullWidth
            name="payment_status"
            onChange={handleTransactionChange}
            size="small"
            required
            defaultValue="SINGLE PAYMENT"
          >
            <MenuItem value="SINGLE PAYMENT">SINGLE PAYMENT</MenuItem>
            <MenuItem value="DOUBLE PAYMENT">DOUBLE PAYMENT</MenuItem>
          </TextField>
        </FormStack>
        {beneficiaries.map((beneficiary, index) => (
          <FormStack>
            <TextField
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              fullWidth
              name="customer_account_name"
              onChange={(event) => handleBeneficiariesForm(event, index)}
              size="small"
              required
              value={beneficiary["customer_account_name"] || ""}
            />

            <TextField
              id="standard-number"
              label="Account Number"
              variant="standard"
              fullWidth
              type="text"
              name="customer_account_number"
              onChange={(event) => handleBeneficiariesForm(event, index)}
              size="small"
              value={beneficiary["customer_account_number"] || ""}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
                minLength: 10,
                title: "Please enter a 10-digit number",
              }}
            />
            <TextField
              select
              id="standard-select-currency"
              label="Bank Name"
              fullWidth
              variant="standard"
              name="customer_bank_name"
              onChange={(event) => handleBeneficiariesForm(event, index)}
              value={beneficiary["customer_bank_name"] || ""}
              size="small"
            >
              <MenuItem value=""></MenuItem>
              {commercialBanks.map((bankName) => (
                <MenuItem key={bankName} value={bankName}>
                  {bankName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-number"
              label="Amount"
              fullWidth
              variant="standard"
              name="amount"
              type="number"
              value={beneficiary["amount"] || ""}
              onChange={(event) => handleBeneficiariesForm(event, index)}
              size="small"
            />
          </FormStack>
        ))}
        <FormStack>
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            fullWidth
            name="description"
            onChange={handleTransactionChange}
            value={transaction.description}
            size="small"
            multiline
          />
          <TextField
            id="standard-basic"
            label="Phone Number"
            fullWidth
            type="text"
            variant="standard"
            name="phone_number"
            onChange={handleTransactionChange}
            value={transaction.phone_number || ""}
            size="small"
            required
            inputProps={{
              inputMode: "numeric",
              pattern: "^[0-9]*$",
              maxLength: 15,
              minLength: 11,
              title: "Please enter a 15-digit number",
            }}
          />
          {props.use === "edit" ? (
            <TextField
              disabled
              id="standard-disabled"
              label="Initiator"
              variant="standard"
              fullWidth
              name="initiator"
              onChange={handleTransactionChange}
              size="small"
              value={transaction.initiator}
            />
          ) : (
            <>
              <TextField
                disabled
                id="standard-disabled"
                label="Initiator"
                variant="standard"
                fullWidth
                name="initiator"
                onChange={handleTransactionChange}
                size="small"
                value={(transaction.initiator = station)}
                defaultValue={(transaction.initiator = station)}
              />
            </>
          )}
          {props.use === "create" ? (
            <></>
          ) : (
            <TextField
              id="standard-select-currency"
              select
              label="Status"
              value={transaction.status}
              variant="standard"
              fullWidth
              name="status"
              onChange={handleTransactionChange}
              size="small"
            >
              <MenuItem value="SENT">SENT</MenuItem>
              <MenuItem value="INITIATED">INITIATED</MenuItem>
              <MenuItem value="APPROVED">APPROVED</MenuItem>
            </TextField>
          )}
        </FormStack>
        <FormStack>
          <Typography variant="h6">
            {" "}
            Customer Balance:{" "}
            {transactionCalculation().balance
              ? transactionCalculation().balance
              : 0}
          </Typography>
        </FormStack>
        <FormStack>
          {use === "create" ? (
            <>
              <Button
                variant="text"
                type="submit"
                sx={purpleButton}
                endIcon={<SendIcon />}
              >
                SEND
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button
                variant="text"
                sx={purpleButton}
                onClick={handleUpdateSubmit}
              >
                update
              </Button>
              <Button
                variant="text"
                sx={purpleButton}
                onClick={() => {
                  navigate(`/${transaction.receipt_number}/receipt`, {
                    state: { data: transaction },
                  });
                }}
              >
                Generate Receipt
              </Button>
              <Button
                variant="text"
                sx={deleteButton}
                onClick={handleDeleteSubmit}
              >
                DELETE
              </Button>
            </>
          )}
          <CancelButton name="Cancel" />
        </FormStack>
      </Box>
    </>
  );
}
