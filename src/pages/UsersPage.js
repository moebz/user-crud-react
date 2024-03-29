import React, { useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Title from "../components/Title";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";

import { getCurrentMilliseconds } from "../utils/utils";
import { DeletionModal } from "../features/UserList/components/DeletionModal";
import { CreationModal } from "../features/UserList/components/CreationModal";
import { EditionModal } from "../features/UserList/components/EditionModal";
import { useUsersList } from "../features/UserList/components/UserList.hooks";
import { UserList } from "../features/UserList/components/UserList";

function UsersPage() {
  const currentMilliseconds = getCurrentMilliseconds();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function showCreationForm() {
    setSelectedImage(null);
    setIsCreationModalOpen(true);
  }

  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageForEdition, setSelectedImageForEdition] = useState(null);

  function showEditionForm(user) {
    setSelectedUser(user);
    setSelectedImageForEdition(null);
    setIsEditModalOpen(true);
  }

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsDeletionModalOpen(true);
  }

  const {
    users,
    filter,
    setFilter,
    currentPage,
    order,
    orderBy,
    getUsersAndSetState,
    handlePageChange,
    handleApplyFilter,
    clearFilter,
    createSortHandler,
    totalNumberOfPages,
  } = useUsersList({ setIsSnackbarOpen, setSnackbarMessage });

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container component="main" sx={{ marginTop: 2 }}>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
        data-testid="snackbar"
      />

      <CreationModal
        currentMilliseconds={currentMilliseconds}
        getUsersAndSetState={getUsersAndSetState}
        filter={filter}
        orderBy={orderBy}
        order={order}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setIsCreationModalOpen={setIsCreationModalOpen}
        selectedImage={selectedImage}
        isCreationModalOpen={isCreationModalOpen}
        setIsModalOpen={setIsCreationModalOpen}
      />

      <EditionModal
        currentMilliseconds={currentMilliseconds}
        isEditModalOpen={isEditModalOpen}
        getUsersAndSetState={getUsersAndSetState}
        filter={filter}
        orderBy={orderBy}
        order={order}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedImageForEdition={selectedImageForEdition}
        setSelectedImageForEdition={setSelectedImageForEdition}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <DeletionModal
        isDeletionModalOpen={isDeletionModalOpen}
        getUsersAndSetState={getUsersAndSetState}
        filter={filter}
        orderBy={orderBy}
        order={order}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setIsDeletionModalOpen={setIsDeletionModalOpen}
        selectedUser={selectedUser}
      />

      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Title>User list</Title>

        <Button
          type="submit"
          variant="contained"
          sx={{ mb: 3 }}
          onClick={showCreationForm}
          data-testid="create-user-button"
        >
          Add new user
        </Button>
      </Grid>

      <UserList
        setFilter={setFilter}
        currentMilliseconds={currentMilliseconds}
        filter={filter}
        handleApplyFilter={handleApplyFilter}
        clearFilter={clearFilter}
        users={users}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalNumberOfPages={totalNumberOfPages}
        order={order}
        orderBy={orderBy}
        createSortHandler={createSortHandler}
        askForDeletionConfirmation={askForDeletionConfirmation}
        showEditionForm={showEditionForm}
      />
    </Container>
  );
}

export { UsersPage };
