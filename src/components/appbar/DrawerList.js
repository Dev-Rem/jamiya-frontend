import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import "../../assets/css/drawer.css";
import Image from "mui-image";
import FxLogo from "../../assets/images/logo.png";

export default function DrawerList() {
  return (
    <List sx={{ padding: 0 }}>
      <Link href="/dashboard">
        <Image src={FxLogo} alt="Logo" />
      </Link>
      <Link href="/dashboard" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItemButton>
          <ListItemText primary="Front Desk" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/bank" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Bank" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/online" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Online" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/marketing" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Marketing" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/general-ledger" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="General Ledger" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/customer-ledger" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Customer Ledger" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/reports" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Report Log" />
        </ListItemButton>
      </Link>
      <Divider />
      <Link href="/transaction-log" color="inherit" underline="none">
        <ListItemButton button>
          <ListItemText primary="Transaction Log" />
        </ListItemButton>
      </Link>
    </List>
  );
}
