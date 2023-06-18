import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageSearch from "@mui/icons-material/ManageSearch";
import { styled } from "@mui/material/styles";
import { history } from "../utils/history";
import { DrawerHeader } from "./DrawerHeader";
import { Home } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function CustomDrawer({ open, closeDrawerAndGoTo }) {
  const listItemButtonStyle = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  };

  const listItemIconStyle = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  const listItemTextStyle = { opacity: open ? 1 : 0 };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        <ListItem key={"list"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={listItemButtonStyle}
            onClick={() => closeDrawerAndGoTo("/home")}
          >
            <ListItemIcon sx={listItemIconStyle}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" sx={listItemTextStyle} />
          </ListItemButton>
          <ListItemButton
            sx={listItemButtonStyle}
            onClick={() => closeDrawerAndGoTo("/users")}
          >
            <ListItemIcon sx={listItemIconStyle}>
              <ManageSearch />
            </ListItemIcon>
            <ListItemText primary="List" sx={listItemTextStyle} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export { CustomDrawer };
