import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import "../assets/css/drawer.css";
import Image from "mui-image";
import FxLogo from "../assets/images/logo.png";

export default function DrawerList() {
  return (
    <List sx={{ padding: 0 }}>
      <Link href="/dashboard">
        <Image src={FxLogo} alt="Logo" />
      </Link>
      <Link href="/dashboard" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Front Desk" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Bank" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Online" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Head of Marketing" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="General Ledger" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Customer Ledger" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Reports" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/front-desk" color="inherit" underline="none">
        <ListItem button>
          <ListItemText primary="Transactions" />
        </ListItem>
      </Link>
    </List>
  );
}
