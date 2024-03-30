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
import { FileInput } from "../../../../components/FileInput";
import { ButtonWithLoader } from "../../../../components/ButtonWithLoader";
import { useUserCreation } from "./UserCreation.hooks";

function CreationModal({
  currentMilliseconds,
  setSnackbarMessage,
  setIsSnackbarOpen,
  setIsCreationModalOpen,
  isCreationModalOpen,
  loadFirstPage,
  selectedImage,
  setSelectedImage,
}) {
  const imageInputRef = React.useRef();

  const {
    isUserCreationLoading,
    isCreationFormAlertOpen,
    setIsCreationFormAlertOpen,
    creationFormAlertMessage,
    username,
    setUsername,
    password1,
    setPassword1,
    password2,
    setPassword2,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    role,
    createUser,
    cleanAndCloseCreationModal,
    handleRoleChange,
  } = useUserCreation({
    setSnackbarMessage,
    setIsSnackbarOpen,
    setIsCreationModalOpen,
    loadFirstPage,
    selectedImage,
  });

  return (
    <>
      <Dialog
        open={isCreationModalOpen}
        onClose={cleanAndCloseCreationModal}
        data-testid="creation-modal"
      >
        <DialogTitle>New user</DialogTitle>
        <DialogContent>
          <TextField
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            margin="normal"
            fullWidth
            label="First name"
            data-testid="firstname-input"
          />

          <TextField
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            margin="normal"
            fullWidth
            label="Last name"
            data-testid="lastname-input"
          />

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
            label="Email"
            data-testid="email-input"
          />

          <TextField
            value={username}
            autoComplete={currentMilliseconds}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
            required
            fullWidth
            label="Username"
            data-testid="username-input"
          />

          <TextField
            value={password1}
            autoComplete={currentMilliseconds}
            onChange={(event) => setPassword1(event.target.value)}
            margin="normal"
            fullWidth
            label="New password"
            type="password"
            data-testid="password1-input"
          />

          <TextField
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            margin="normal"
            fullWidth
            label="Password confirmation"
            type="password"
            autoComplete={currentMilliseconds}
            data-testid="password2-input"
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <InputLabel id="creation-role-select-label">Role</InputLabel>
            <Select
              labelId="creation-role-select-label"
              id="creation-role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              data-testid="select-role-input"
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
                  onClick={() => setIsCreationFormAlertOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              data-testid="creation-form-alert"
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
              dataTestId="submit-user-button"
              loaderDataTestId="submit-user-button-loader"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { CreationModal };
