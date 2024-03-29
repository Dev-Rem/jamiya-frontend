import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Recievable, Payable } from "./CustomerLedgerList";
import Stack from "@mui/material/Stack";
import { purpleButton } from "../utils/Button";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

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

export default function CustomerLedger() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Link
          to={`${location.pathname}/add`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="text" type="submit" sx={purpleButton}>
            Add new
          </Button>
        </Link>
      </Stack>

      <Box mt={2} sx={{ width: "100%", bgcolor: "white", borderRadius: 1 }}>
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
          <Recievable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Payable />
        </TabPanel>
      </Box>
    </div>
  );
}
