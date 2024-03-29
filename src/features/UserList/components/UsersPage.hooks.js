import { useState } from "react";
import { getCurrentMilliseconds } from "../../../utils/utils";

export const useUsersPage = () => {
  const currentMilliseconds = getCurrentMilliseconds();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  // [START creation vars]

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function showCreationForm() {
    setSelectedImage(null);
    setIsCreationModalOpen(true);
  }

  // [END creation vars]

  // "selectedUser" is shared between the "EditionModal" and the "DeletionModal".
  const [selectedUser, setSelectedUser] = useState(null);

  // [START edition vars]

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageForEdition, setSelectedImageForEdition] = useState(null);

  function showEditionForm(user) {
    setSelectedUser(user);
    setSelectedImageForEdition(null);
    setIsEditModalOpen(true);
  }

  // [END edition vars]

  // [START deletion vars]

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsDeletionModalOpen(true);
  }

  // [END deletion vars]

  return {
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
  };
};
