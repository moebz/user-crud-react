import React, { useState } from "react";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { CustomDrawer } from "./CustomDrawer";
import { authService } from "../utils/authService";
import { history } from "../utils/history";

function AppBarWithDrawer({
  currentUser,
  setCurrentUser,
  currentUserData,
  setCurrentUserData,
}) {
  console.log("AppBarWithDrawer.currentUserData", currentUserData);

  const [open, setOpen] = useState(false);

  const logOut = () => {
    setCurrentUser(null);
    setCurrentUserData(null);
    authService.logoutAndRedirectToLogin();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closeDrawerAndGoTo = (url) => {
    history.navigate(url);
    handleDrawerClose();
  };

  return (
    <>
      <ResponsiveAppBar
        currentUser={currentUser}
        currentUserData={currentUserData}
        logOut={logOut}
        onBurgerClick={() => (!open ? handleDrawerOpen() : handleDrawerClose())}
        closeDrawerAndGoTo={closeDrawerAndGoTo}
      />
      <CustomDrawer open={open} closeDrawerAndGoTo={closeDrawerAndGoTo} />
    </>
  );
}

export { AppBarWithDrawer };
