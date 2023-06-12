import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { authService } from "./../utils/authService";
import { useNavigate } from "react-router-dom";
import api from "./../utils/api";
import { ButtonWithLoader } from "../components/ButtonWithLoader";
import { CollapsableAlert } from "../components/CollapsableAlert";

function Login({ setCurrentUser, setCurrentUserData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      setLoading(true);

      await authService.login(
        data.get("username"),
        data.get("password"),
        setCurrentUser
      );

      const currentUser = authService.getCurrentUser();

      const userData = await api.get(`/users/${currentUser.decodedToken.id}`);

      console.log("userData", userData);

      setCurrentUserData(userData.data.data[0]);

      navigate("/home");
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log({
        resMessage,
      });

      setAlertMessage(resMessage);
      openAlert();
    } finally {
      setLoading(false);
    }
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign in
        </Typography>

        <CollapsableAlert
          isAlertOpen={isAlertOpen}
          closeAlert={closeAlert}
          alertMessage={alertMessage}
        />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ mb: 3 }}
          />

          <ButtonWithLoader
            type="submit"
            isLoading={loading}
            buttonText="Sign in"
          />
        </Box>
      </Box>
    </Container>
  );
}

export { Login };
