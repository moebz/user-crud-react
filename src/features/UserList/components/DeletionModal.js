import React from "react";
import {
  Alert,
  Collapse,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonWithLoader } from "../../../components/ButtonWithLoader";

function DeletionModal({
  isModalOpen,
  handleModalClose,
  isDeletionFormAlertOpen,
  setIsDeletionFormAlertOpen,
  deletionFormAlertMessage,
  deleteUser,
  isUserDeletionLoading,
}) {
  return (
    <>
      <Dialog
        data-testid="deletion-modal"
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete this user?
          </DialogContentText>

          <Collapse in={isDeletionFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsDeletionFormAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              data-testid="deletion-form-alert"
            >
              {deletionFormAlertMessage}
            </Alert>
          </Collapse>

          <ButtonWithLoader
            onButtonClick={deleteUser}
            isLoading={isUserDeletionLoading}
            buttonText="Delete"
            dataTestId="submit-user-deletion-button"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { DeletionModal };
