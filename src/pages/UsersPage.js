import React from "react";

import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { DeletionModal } from "../features/UserList/components/DeletionModal";
import { CreationModal } from "../features/UserList/components/CreationModal";
import { EditionModal } from "../features/UserList/components/EditionModal";
import { useUsersList } from "../features/UserList/components/UserList.hooks";
import { UserList } from "../features/UserList/components/UserList";
import { useUsersPage } from "../features/UserList/components/UsersPage.hooks";
import { TitleLine } from "../features/UserList/components/TitleLine";

function UsersPage() {
  const {
    currentMilliseconds,
    isSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    handleSnackbarClose,
    isCreationModalOpen,
    selectedImage,
    showCreationForm,
    selectedUser,
    isEditModalOpen,
    selectedImageForEdition,
    showEditionForm,
    isDeletionModalOpen,
    askForDeletionConfirmation,
    setIsSnackbarOpen,
    setIsCreationModalOpen,
    setIsEditModalOpen,
    setSelectedImageForEdition,
    setSelectedUser,
    setIsDeletionModalOpen,
  } = useUsersPage();

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

      <TitleLine showCreationForm={showCreationForm} />

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
