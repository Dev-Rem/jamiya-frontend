import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import "../assets/css/drawer.css";

export default function Drawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href="/dashboard">
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/front-desk">
          <ListItem button>
            <ListItemText primary="Front Desk" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Bank" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Online" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Head of Marketing" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="General Ledger" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Customer Ledger" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Reports" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link>
            <ListItemText primary="Transactions" />
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            className="drawer-button"
          >
            <MenuIcon sx={{ fontSize: 35 }} />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
