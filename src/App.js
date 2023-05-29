import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { Landing } from "./Landing";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { authService } from "./authService";
import { history } from "./history";
import { RequireAuth } from "./RequireAuth";
import { Users } from "./Users";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import api from "./api";

import CssBaseline from "@mui/material/CssBaseline";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ManageSearch from "@mui/icons-material/ManageSearch";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
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

function App() {
  // Init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components).
  history.navigate = useNavigate();
  history.location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closeMenuAndGoToUserList = () => {
    history.navigate("/users");
    handleDrawerClose();
  };

  const requestUserDataAndSaveItInState = async (user) => {
    const userData = await api.get(`/users/${user.decodedToken.id}`);
    console.log("userData", userData);
    setCurrentUserData(userData.data.data[0]);
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log("App.useEffect.user", user);
    if (user) {
      setCurrentUser(user);

      if (!currentUserData) {
        requestUserDataAndSaveItInState(user);
      }
    }
  }, []);

  const logOut = () => {
    setCurrentUser(null);
    setCurrentUserData(null);
    authService.logoutAndRedirectToLogin();
  };

  console.log("App.render.currentUser", currentUser);

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: "flex", overflowX: "hidden" }}>
        <ResponsiveAppBar
          currentUser={currentUser}
          currentUserData={currentUserData}
          logOut={logOut}
          onBurgerClick={() =>
            !open ? handleDrawerOpen() : handleDrawerClose()
          }
        />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <List>
            <ListItem key={"list"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={closeMenuAndGoToUserList}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ManageSearch />
                </ListItemIcon>
                <ListItemText primary="List" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 215 }}>
          <DrawerHeader />
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setCurrentUser={setCurrentUser}
                  setCurrentUserData={setCurrentUserData}
                  requestUserDataAndSaveItInState={
                    requestUserDataAndSaveItInState
                  }
                />
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
