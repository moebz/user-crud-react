import React, { useState } from "react";
import { history } from "./history";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";

function ResponsiveAppBar({
  currentUser,
  currentUserData,
  onBurgerClick,
  logOut,
}) {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex" },
            backgroundColor: "green",
          }}
        >
          <IconButton
            size="large"
            onClick={onBurgerClick}
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            backgroundColor: "red",
          }}
        >
          Users
        </Typography>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            backgroundColor: "pink",
          }}
        >
          Users
        </Typography>
        
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Account menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Profile"
                src={
                  currentUserData?.avatar_url &&
                  `http://localhost:4000/${currentUserData.avatar_url}`
                }
                children={<PersonIcon />}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {currentUser?.decodedToken && [
              <MenuItem key="username" disabled={true}>
                <Typography variant="body2" textAlign="center">
                  {currentUser.decodedToken.username}
                </Typography>
              </MenuItem>,
              <MenuItem key="name" disabled={true}>
                <Typography variant="body2" textAlign="center">
                  {`${currentUser.decodedToken.firstname} ${currentUser.decodedToken.lastname}`}
                </Typography>
              </MenuItem>,
              <MenuItem key="email" disabled={true} divider={true}>
                <Typography variant="body2" textAlign="center">
                  {currentUser.decodedToken.email}
                </Typography>
              </MenuItem>,
            ]}

            {currentUser?.decodedToken && (
              <MenuItem key="logout" onClick={logOut}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            )}

            {!currentUser?.decodedToken && (
              <MenuItem key="login" onClick={() => history.navigate("/login")}>
                <Typography textAlign="center">Log in</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { ResponsiveAppBar };
