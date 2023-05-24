import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import "../../assets/css/drawer.css";
import Image from "mui-image";
import FxLogo from "../../assets/images/jamiyafx.png";

export default function DrawerList() {
  const [admin, setAdmin] = React.useState(
    JSON.parse(localStorage.getItem("user")).is_admin
  );

  return (
    <List sx={{ padding: 0 }}>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <Image src={FxLogo} alt="Logo" />
      </Link>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton button>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Divider />
      {admin ? (
        <></>
      ) : (
        <>
          <Link to="/report" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemText primary="Report" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/my-transactions"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="My Transactions" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      )}
      {admin ? (
        <>
          <Link
            to="/general-ledger"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton button>
              <ListItemText primary="General Ledger" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/customer-ledger"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton button>
              <ListItemText primary="Customer Ledger" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/report-logs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton button>
              <ListItemText primary="Report Logs" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/transaction-logs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton button>
              <ListItemText primary="Transaction Log" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      ) : (
        <></>
      )}

      <ListItemButton>
        <ListItemText
          primary={JSON.parse(localStorage.getItem("user")).station}
        />
      </ListItemButton>
      <Divider />
    </List>
  );
}
