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
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import { FileInput } from "./general/FileInput";
import { ButtonWithLoader } from "./general/ButtonWithLoader";

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
      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
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
            Edit user
          </Typography>

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

          <Box sx={{ position: "relative", mb: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={editUser}
              disabled={isUserEditLoading}
            >
              Save changes
            </Button>
            {isUserEditLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export { EditionModal };
