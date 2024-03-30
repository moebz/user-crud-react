import React from "react";

import Container from "@mui/material/Container";

import { DeletionModal } from "../features/UserList/components/deletion/DeletionModal";
import { CreationModal } from "../features/UserList/components/creation/CreationModal";
import { EditionModal } from "../features/UserList/components/edition/EditionModal";
import { useUsersList } from "../features/UserList/components/list/UserList.hooks";
import { UserList } from "../features/UserList/components/list/UserList";
import { useUsersPage } from "../features/UserList/components/page/UsersPage.hooks";
import { TitleLine } from "../features/UserList/components/list/TitleLine";
import { useSnackbar } from "../utils/useSnackbar";
import { Snackbar } from "../components/Snackbar";

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

      <CreationModal
        currentMilliseconds={currentMilliseconds}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setIsCreationModalOpen={setIsCreationModalOpen}
        isCreationModalOpen={isCreationModalOpen}
        loadFirstPage={loadFirstPage}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      <EditionModal
        currentMilliseconds={currentMilliseconds}
        isEditModalOpen={isEditModalOpen}
        loadFirstPage={loadFirstPage}
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
        loadFirstPage={loadFirstPage}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setIsDeletionModalOpen={setIsDeletionModalOpen}
        selectedUser={selectedUser}
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
