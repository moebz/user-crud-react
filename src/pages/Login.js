import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { authService } from "./../utils/authService";
import api from "./../utils/api";

import { ButtonWithLoader } from "../components/ButtonWithLoader";
import { CollapsableAlert } from "../components/CollapsableAlert";

const styles = {
  container: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: { m: 1, bgcolor: "secondary.main" },
  title: { mb: 2 },
  passwordInput: { mb: 3 },
};

function Login({ setCurrentUser, setCurrentUserData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const data = new FormData(event.currentTarget);

      await authService.login(
        data.get("username"),
        data.get("password"),
        setCurrentUser
      );

      const currentUser = authService.getCurrentUser();

      const userData = await api.get(`/users/${currentUser.decodedToken.id}`);

      console.log("userData", userData);

      setCurrentUserData(userData.data.data);

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
    <Container component="main" maxWidth="xs" sx={styles.container}>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography
        data-testid="title"
        component="h1"
        variant="h5"
        sx={styles.title}
      >
        Sign in
      </Typography>

      <CollapsableAlert
        isAlertOpen={isAlertOpen}
        closeAlert={closeAlert}
        alertMessage={alertMessage}
      />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          data-testid="username-input"
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
          data-testid="password-input"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={styles.passwordInput}
        />

        <ButtonWithLoader
          dataTestId="submit-input"
          type="submit"
          isLoading={loading}
          buttonText="Sign in"
        />
      </Box>
    </Container>
  );
}

export { Login };
