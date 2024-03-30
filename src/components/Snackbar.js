import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import MUISnackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

function Snackbar({
  autoHideDuration = 6000,
  isSnackbarOpen,
  snackbarMessage,
  handleSnackbarClose,
}) {
  return (
    <MUISnackbar
      open={isSnackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      data-testid="snackbar"
    />
  );
}

export { Snackbar };
