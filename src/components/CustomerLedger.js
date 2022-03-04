import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CustomerLedgerList from "./CustomerLedgerList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Divider from "@mui/material/Divider";

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
      <Stack spacing={2} direction="row">
        <Button variant="text" sx={{ color: "#303030" }}>
          New Report
        </Button>
        <Button variant="text" sx={{ color: "#303030" }}>
          Add New
        </Button>
      </Stack>
      <Box sx={{ width: "100%", bgcolor: "white", borderRadius: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AltTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <AltTab label="RECIEVABLE" {...a11yProps(0)} />
            <AltTab label="PAYABLE" {...a11yProps(1)} />
          </AltTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CustomerLedgerList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomerLedgerList />
        </TabPanel>
      </Box>
    </div>
  );
}
