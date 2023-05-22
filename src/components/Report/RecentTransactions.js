import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { TransactionList } from "../report/TransactionList";
import { axiosInstance } from "../utils/AxiosInstance";
import { useLocation } from "react-router-dom";
import FormStack from "../utils/FormStack";
import Pagination from "@mui/material/Pagination";

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
    backgroundColor: "#C9037F",
  },
});
const AltTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#C9037F",
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

  function getStation(currentUrl) {
    switch (currentUrl.pathname) {
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
  const currentUrl = useLocation();
  let station = getStation(currentUrl);

  const getTransactions = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    try {
      const response = await axiosInstance.get("/transactions/");
      setTransactions(
        response.data.results.filter(
          (transaction) =>
            transaction.initiator === station &&
            transaction.date_created === `${year}-${month}-${day}`
        )
      );
    } catch {
      setTransactions([]);
    }
  };

  React.useEffect(() => {
    getTransactions();
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
            <AltTab label="Transaction Sent" {...a11yProps(0)} />
            <AltTab label="Transaction Initiated" {...a11yProps(1)} />
            <AltTab label="Transaction Approved" {...a11yProps(2)} />
          </AltTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TransactionList
            data={transactions.filter(
              (transaction) => transaction.status === "SENT"
            )}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionList
            data={transactions.filter(
              (transaction) => transaction.status === "INITIATED"
            )}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionList
            data={transactions.filter(
              (transaction) => transaction.status === "APPROVED"
            )}
          />
        </TabPanel>
      </Box>
    </div>
  );
}

export function TransactionLogComponent() {
  const [transactions, setTransactions] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const getTransactions = async (page) => {
    try {
      const response = await axiosInstance.get(`/transactions`, {
        params: {
          page: page,
        },
      });
      setTransactions(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getTransactions(page);
  };

  React.useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
      <FormStack></FormStack>
      <TransactionList data={transactions} />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}

export function SearchedTransaction() {
  const currentUrl = useLocation();
  return (
    <>
      {" "}
      <TransactionList data={currentUrl.state.data.results} />
    </>
  );
}
