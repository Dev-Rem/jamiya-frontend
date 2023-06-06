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
  const [staff, setStaff] = React.useState(
    JSON.parse(localStorage.getItem("user")).is_staff
  );

  return (
    <List sx={{ padding: 0 }}>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
        <Image src={FxLogo} alt="Logo" />
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Divider />
      {admin && staff ? (
        <></>
      ) : (
        <>
          <Link to="/report" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemText primary="Daily Report" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/new-transaction"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="New Transaction" />
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
      {admin && staff ? (
        <>
          <Link
            to="/general-ledger"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="General Ledger" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/customer-ledger"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="Customer Ledger" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      ) : (
        <></>
      )}
      {admin ? (
        <>
          <Link
            to="/report-logs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="Report Logs" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link
            to="/transaction-logs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemText primary="Transaction Logs" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      ) : (
        <></>
      )}
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton>
          <ListItemText
            primary={`Station: ${
              JSON.parse(localStorage.getItem("user")).station
            }`}
          />
        </ListItemButton>
      </Link>

      <Divider />
    </List>
  );
}
