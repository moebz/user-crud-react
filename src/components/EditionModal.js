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
import { FileInput } from "./FileInput";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { CurrentProfilePicture } from "./CurrentProfilePicture";

function EditionModal({
  currentMilliseconds,
  isEditModalOpen,
  handleEditModalClose,
  selectedUser,
  setSelectedUser,
  editionImageInputRef,
  selectedImageForEdition,
  setSelectedImageForEdition,
  isEditFormAlertOpen,
  setIsEditFormAlertOpen,
  editFormAlertMessage,
  editUser,
  isUserEditLoading,
  cleanAndCloseEditionModal,
  markForChange,
  setMarkForChange,
  markForDeletion,
  setMarkForDeletion,
  resetEditionImageInput,
}) {
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
      <Dialog open={isEditModalOpen} onClose={cleanAndCloseEditionModal}>
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
              buttonText="Save changes"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { EditionModal };
