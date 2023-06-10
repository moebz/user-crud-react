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

function CreationModal({
  isCreationModalOpen,
  cleanAndCloseCreationModal,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  username,
  currentMilliseconds,
  setUsername,
  password1,
  setPassword1,
  password2,
  setPassword2,
  role,
  handleRoleChange,
  imageInputRef,
  selectedImage,
  setSelectedImage,
  isCreationFormAlertOpen,
  creationFormAlertMessage,
  createUser,
  isUserCreationLoading,
}) {
  return (
    <>
      <Dialog open={isCreationModalOpen} onClose={cleanAndCloseCreationModal}>
        <DialogTitle>New user</DialogTitle>
        <DialogContent>
          <TextField
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            margin="normal"
            fullWidth
            label="First name"
          />

          <TextField
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            margin="normal"
            fullWidth
            label="Last name"
          />

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
            label="Email"
          />

          <TextField
            value={username}
            autoComplete={currentMilliseconds}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
            required
            fullWidth
            label="Username"
          />

          <TextField
            value={password1}
            autoComplete={currentMilliseconds}
            onChange={(event) => setPassword1(event.target.value)}
            margin="normal"
            fullWidth
            label="New password"
            type="password"
          />

          <TextField
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            margin="normal"
            fullWidth
            label="Password confirmation"
            type="password"
            autoComplete={currentMilliseconds}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <InputLabel id="creation-role-select-label">Role</InputLabel>
            <Select
              labelId="creation-role-select-label"
              id="creation-role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value={"standard"}>Standard</MenuItem>
              <MenuItem value={"admin"}>Administrator</MenuItem>
            </Select>
          </FormControl>

          <FileInput
            imageInputRef={imageInputRef}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <Collapse in={isCreationFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={cleanAndCloseCreationModal}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {creationFormAlertMessage}
            </Alert>
          </Collapse>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonWithLoader
              onButtonClick={createUser}
              isLoading={isUserCreationLoading}
              buttonText="Add"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { CreationModal };
