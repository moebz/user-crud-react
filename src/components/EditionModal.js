import React from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FileInput } from "./FileInput";
import { ButtonWithLoader } from "./ButtonWithLoader";

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
}) {
  return (
    <>
      <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
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

              <Box sx={{ mb: 2 }}>
                <FileInput
                  imageInputRef={editionImageInputRef}
                  selectedImage={selectedImageForEdition}
                  setSelectedImage={setSelectedImageForEdition}
                />
              </Box>
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
