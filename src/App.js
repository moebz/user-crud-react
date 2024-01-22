import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { history } from "./utils/history";
import useCurrentUserData from "./utils/useCurrentUserData";

import { DrawerHeader } from "./components/DrawerHeader";
import { AppBarWithDrawer } from "./components/AppBarWithDrawer";
import Routes from "./components/Routes";

const styles = {
  outerContainer: { display: "flex", overflowX: "hidden" },
  innerContainer: { flexGrow: 1, p: 3, minWidth: 215 },
};

function App() {
  // Init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components).
  history.navigate = useNavigate();
  history.location = useLocation();

  const { currentUser, setCurrentUser, currentUserData, setCurrentUserData } =
    useCurrentUserData();

  console.log("App.render.currentUser", currentUser);
  console.log("App.render.currentUserData", currentUserData);

  return (
    <>
      <CssBaseline />

      <Box sx={styles.outerContainer}>
        <AppBarWithDrawer
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        <Box component="main" sx={styles.innerContainer}>
          <DrawerHeader />
          <Routes
            setCurrentUser={setCurrentUser}
            setCurrentUserData={setCurrentUserData}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
