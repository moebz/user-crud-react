import React, { useState } from "react";

export const useSnackbar = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  return {
    snackbarMessage,
    setSnackbarMessage,
    isSnackbarOpen,
    setIsSnackbarOpen,
    handleSnackbarClose,
  };
};
