import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { TransactionList } from "./TransactionList";
import axios from "axios";

const data = [
  {
    beneficiaries: "SINGLE_PAYMENT",
    customer_name1: "Aremu Oluwaseyi Festus",
    account_number1: "0235770003",
    bank_name1: "GTB",
    phone_number: "08034164740",
    address: "No. 5 Adiss Aluminium Crescent, Kubwa Anuja",
    recieve_mode: "CASH",
    currency_recieved: "DOLLAR",
    amount_recieved: 100,
    give_mode: "CASH",
    rate: 575,
    currency_given: "NAIRA",
    cash_given: 57500,
    amount_transfered: 0,
    description: "TEST",
    initiator: "FRONTDESK",
    status: "SENT",
    categories: "PURCHASE",
    profit: 0.0,
  },
  {
    beneficiaries: "SINGLE_PAYMENT",
    customer_name1: "Aremu Oluwaseyi Festus",
    account_number1: "0235770003",
    bank_name1: "GTB",
    phone_number: "08034164740",
    address: "No. 5 Adiss Aluminium Crescent, Kubwa Anuja",
    recieve_mode: "CASH",
    currency_recieved: "DOLLAR",
    amount_recieved: 100,
    give_mode: "CASH",
    rate: 575,
    currency_given: "NAIRA",
    cash_given: 57500,
    amount_transfered: 0,
    description: "TEST",
    initiator: "FRONTDESK",
    status: "SENT",
    categories: "PURCHASE",
    profit: 0.0,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const AltTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#925098",
  },
});
const AltTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#925098",
  },
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RecentTransactions() {
  const [value, setValue] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);

  async function fetchTransactionData() {
    try {
      let transactionData = await axios.get(
        `http://127.0.0.1:8000/api/transactions/`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNzM5NDU0LCJpYXQiOjE2ODA3Mjg2NTQsImp0aSI6IjYwMjA4Nzc2OGMzNjQ0NjVhMWU4YTI2YTYyMmZhMGExIiwidXNlcl9pZCI6Mn0.sIWEascaGCFr6PS-vOJHOeUs0hjkgIjOfCf8W-TZWmg`,
          },
        }
      );
      console.log(transactionData);
      setTransactions(transactionData.data.results);
    } catch {
      setTransactions("No Transactions posted yet");
    }
  }

  React.useEffect(() => {
    fetchTransactionData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "#303030", marginTop: "30px", marginBottom: "10px" }}
      >
        Recent Transactions
      </Typography>
      <Box sx={{ width: "100%", bgcolor: "white", borderRadius: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AltTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <AltTab label="Transaction Created" {...a11yProps(0)} />
            <AltTab label="Transaction Initiated" {...a11yProps(1)} />
            <AltTab label="Transaction Completed" {...a11yProps(2)} />
          </AltTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TransactionList data={transactions} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionList data={data} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionList data={data} />
        </TabPanel>
      </Box>
    </div>
  );
}
