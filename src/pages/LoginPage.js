import React from "react";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { LoginForm } from "../features/Login";

const styles = {
  container: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: { m: 1, bgcolor: "secondary.main" },
  title: { mb: 2 },
};

function LoginPage({ setCurrentUser, setCurrentUserData }) {
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

      <LoginForm
        setCurrentUser={setCurrentUser}
        setCurrentUserData={setCurrentUserData}
      />
    </Container>
  );
}

export { LoginPage };
