import React, { useRef } from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import { FileInput } from "../../../../components/FileInput";
import { ButtonWithLoader } from "../../../../components/ButtonWithLoader";
import { CurrentProfilePicture } from "../../../../components/CurrentProfilePicture";
import { useUsersEdition } from "./UserEdition.hooks";

function EditionModal({
  currentMilliseconds,
  isEditModalOpen,
  loadFirstPage,
  setSnackbarMessage,
  setIsSnackbarOpen,
  setIsEditModalOpen,
  selectedImageForEdition,
  setSelectedImageForEdition,
  selectedUser,
  setSelectedUser,
}) {
  const editionImageInputRef = useRef();

  const {
    isUserEditLoading,
    isEditFormAlertOpen,
    setIsEditFormAlertOpen,
    editFormAlertMessage,
    markForChange,
    setMarkForChange,
    markForDeletion,
    setMarkForDeletion,
    editUser,
    resetEditionImageInput,
    cleanAndCloseEditionModal,
  } = useUsersEdition({
    loadFirstPage,
    setSnackbarMessage,
    setIsSnackbarOpen,
    editionImageInputRef,
    setIsEditModalOpen,
    selectedImageForEdition,
    setSelectedImageForEdition,
    selectedUser,
    setSelectedUser,
  });

  const openImageSelection = () => {
    setMarkForDeletion(false);
    setMarkForChange(true);
    editionImageInputRef?.current?.click();
  };

  const currentImageUrl =
    selectedUser?.avatar_url &&
    `http://localhost:4000/${selectedUser.avatar_url}`;

  let action = null;
  if (selectedImageForEdition) {
    action = (
      <>
        <CheckIcon fontSize="inherit" sx={{ mr: 1 }} />
        The selected image will be uploaded
      </>
    );
  } else if (markForDeletion) {
    action = (
      <>
        <CheckIcon fontSize="inherit" sx={{ mr: 1 }} />
        The current profile image will be deleted
      </>
    );
  }

  return (
    <>
      <Dialog
        open={isEditModalOpen}
        onClose={cleanAndCloseEditionModal}
        data-testid="edition-modal"
      >
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                value={selectedUser.firstname}
                margin="normal"
                fullWidth
                label="First name"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstname: event.target.value,
                  })
                }
                data-testid="firstname-input"
              />

              <TextField
                value={selectedUser.lastname}
                margin="normal"
                fullWidth
                label="Last name"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    lastname: event.target.value,
                  })
                }
                data-testid="lastname-input"
              />

              <TextField
                value={selectedUser.username}
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete={currentMilliseconds}
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    username: event.target.value,
                  })
                }
                data-testid="username-input"
              />

              <TextField
                value={selectedUser.email}
                margin="normal"
                fullWidth
                label="Email"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: event.target.value,
                  })
                }
                data-testid="email-input"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="edition-role-select-label">Role</InputLabel>
                <Select
                  labelId="edition-role-select-label"
                  id="edition-role-select"
                  value={selectedUser.role}
                  label="Role"
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: event.target.value,
                    })
                  }
                >
                  <MenuItem value={"standard"}>Standard</MenuItem>
                  <MenuItem value={"admin"}>Administrator</MenuItem>
                </Select>
              </FormControl>

              <Card sx={{ minWidth: 162, mb: 2 }} variant="outlined">
                <CardContent>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                    color="text.secondary"
                  >
                    Profile photo
                  </Typography>

                  {!markForChange && (
                    <Box sx={{ mb: 2 }}>
                      <CurrentProfilePicture
                        currentImageUrl={currentImageUrl}
                        markForDeletion={markForDeletion}
                        setMarkForDeletion={setMarkForDeletion}
                        openImageSelection={openImageSelection}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{ mb: 2, display: markForChange ? "block" : "none" }}
                  >
                    <FileInput
                      imageInputRef={editionImageInputRef}
                      selectedImage={selectedImageForEdition}
                      setSelectedImage={setSelectedImageForEdition}
                      setMarkForChange={setMarkForChange}
                      openImageSelection={openImageSelection}
                      reset={resetEditionImageInput}
                    />
                  </Box>

                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                      fontSize: 15,
                    }}
                    color="text.secondary"
                  >
                    {action}
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}

          <Collapse in={isEditFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsEditFormAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              data-testid="edition-form-alert"
            >
              {editFormAlertMessage}
            </Alert>
          </Collapse>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonWithLoader
              onButtonClick={editUser}
              isLoading={isUserEditLoading}
              dataTestId="submit-user-edition-button"
              buttonText="Save changes"
              loaderDataTestId="submit-user-edition-button-loader"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { EditionModal };
