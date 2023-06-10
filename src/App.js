import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageSearch from "@mui/icons-material/ManageSearch";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Users } from "./pages/Users";

import { authService } from "./utils/authService";
import { history } from "./utils/history";
import api from "./utils/api";

import { RequireAuth } from "./components/RequireAuth";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";

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

function App() {
  // Init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components).
  history.navigate = useNavigate();
  history.location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

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
  }, [currentUserData]);

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
