import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Alert,
  CircularProgress,
  Collapse,
  TableSortLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonWithLoader } from "./general/ButtonWithLoader";

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
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            outline: 0,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete user
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>

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
            >
              {deletionFormAlertMessage}
            </Alert>
          </Collapse>

          <ButtonWithLoader
            onButtonClick={deleteUser}
            isLoading={isUserDeletionLoading}
            buttonText="Delete"
          />
        </Box>
      </Modal>
    </>
  );
}

export { DeletionModal };
