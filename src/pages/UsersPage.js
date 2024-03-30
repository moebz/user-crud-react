import React from "react";

import Container from "@mui/material/Container";

import { Snackbar } from "../components/Snackbar";
import { useSnackbar } from "../utils/useSnackbar";
import { UserModals } from "../features/UserList/components/page/UserModals";
import { TitleLine } from "../features/UserList/components/list/TitleLine";
import { UserList } from "../features/UserList/components/list/UserList";
import { useUsersList } from "../features/UserList/components/list/UserList.hooks";
import { useUsersPage } from "../features/UserList/components/page/UsersPage.hooks";

function UsersPage() {
  const {
    snackbarMessage,
    setSnackbarMessage,
    isSnackbarOpen,
    setIsSnackbarOpen,
    handleSnackbarClose,
  } = useSnackbar();

  const {
    currentMilliseconds,
    isCreationModalOpen,
    setIsCreationModalOpen,
    handleCreationModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    handleEditionModalOpen,
    selectedImage,
    setSelectedImage,
    selectedUser,
    setSelectedUser,
    selectedImageForEdition,
    setSelectedImageForEdition,
    isDeletionModalOpen,
    setIsDeletionModalOpen,
    askForDeletionConfirmation,
  } = useUsersPage();

  const {
    users,
    filter,
    setFilter,
    currentPage,
    order,
    orderBy,
    handlePageChange,
    handleApplyFilter,
    clearFilter,
    createSortHandler,
    totalNumberOfPages,
    loadFirstPage,
  } = useUsersList({ setIsSnackbarOpen, setSnackbarMessage });

  return (
    <Container component="main" sx={{ marginTop: 2 }}>
      <Snackbar
        isSnackbarOpen={isSnackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
      />

      <UserModals
        currentMilliseconds={currentMilliseconds}
        isCreationModalOpen={isCreationModalOpen}
        setIsCreationModalOpen={setIsCreationModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeletionModalOpen={isDeletionModalOpen}
        setIsDeletionModalOpen={setIsDeletionModalOpen}
        loadFirstPage={loadFirstPage}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedImageForEdition={selectedImageForEdition}
        setSelectedImageForEdition={setSelectedImageForEdition}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <TitleLine handleCreationModalOpen={handleCreationModalOpen} />

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
        handleEditionModalOpen={handleEditionModalOpen}
      />
    </Container>
  );
}

export { UsersPage };
