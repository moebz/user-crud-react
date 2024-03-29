import React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { ButtonWithLoader } from "../../../components/ButtonWithLoader";
import { CollapsableAlert } from "../../../components/CollapsableAlert";
import { useLoginForm } from "./LoginForm.hooks";

const styles = {
  passwordInput: { mb: 3 },
};

function LoginForm({ setCurrentUser, setCurrentUserData }) {
  const { loading, isAlertOpen, alertMessage, handleSubmit, closeAlert } =
    useLoginForm({ setCurrentUser, setCurrentUserData });

  return (
    <>
      <CollapsableAlert
        dataTestId="alert"
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
          loaderDataTestId="submit-loader"
          type="submit"
          isLoading={loading}
          buttonText="Sign in"
        />
      </Box>
    </>
  );
}

export default LoginForm;
