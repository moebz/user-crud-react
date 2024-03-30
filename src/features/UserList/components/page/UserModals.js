import React from "react";

import { DeletionModal } from "../deletion/DeletionModal";
import { CreationModal } from "../creation/CreationModal";
import { EditionModal } from "../edition/EditionModal";

function UserModals({
  currentMilliseconds,
  isCreationModalOpen,
  setIsCreationModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeletionModalOpen,
  setIsDeletionModalOpen,
  loadFirstPage,
  setSnackbarMessage,
  setIsSnackbarOpen,
  selectedImage,
  setSelectedImage,
  selectedImageForEdition,
  setSelectedImageForEdition,
  selectedUser,
  setSelectedUser,
}) {
  return (
    <>
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
    </>
  );
}

export { UserModals };
