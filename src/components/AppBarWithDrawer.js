import React from "react";
import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { CustomDrawer } from "./CustomDrawer";
import { authService } from "../utils/authService";

function AppBarWithDrawer({
  currentUser,
  setCurrentUser,
  currentUserData,
  setCurrentUserData,
}) {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <ResponsiveAppBar
        currentUser={currentUser}
        currentUserData={currentUserData}
        logOut={logOut}
        onBurgerClick={() => (!open ? handleDrawerOpen() : handleDrawerClose())}
      />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
}

export { AppBarWithDrawer };
