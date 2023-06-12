import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function CollapsableAlert({
  isAlertOpen,
  closeAlert,
  alertMessage,
  severity = "warning",
}) {
  return (
    <Collapse in={isAlertOpen}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeAlert}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertMessage}
      </Alert>
    </Collapse>
  );
}

export { CollapsableAlert };
