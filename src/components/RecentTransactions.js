import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TransactionList from "./TransactionList";

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
          <TransactionList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionList />
        </TabPanel>
      </Box>
    </div>
  );
}
