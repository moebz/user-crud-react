import { useState } from "react";
import { getCurrentMilliseconds } from "../../../../utils/utils";
import { useUserCreationModal } from "../creation/UserCreationModal.hooks";
import { useUserEditionModal } from "../edition/UserEditionModal.hooks";
import { useUserDeletionModal } from "../deletion/UserDeletionModal.hooks";

export const useUsersPage = () => {
  const currentMilliseconds = getCurrentMilliseconds();

  // "selectedUser" is shared between the "EditionModal" and the "DeletionModal".
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    isCreationModalOpen,
    setIsCreationModalOpen,
    selectedImage,
    setSelectedImage,
    handleCreationModalOpen,
  } = useUserCreationModal();

  const {
    isEditModalOpen,
    setIsEditModalOpen,
    selectedImageForEdition,
    setSelectedImageForEdition,
    showEditionForm,
  } = useUserEditionModal({ setSelectedUser });

  const {
    isDeletionModalOpen,
    setIsDeletionModalOpen,
    askForDeletionConfirmation,
  } = useUserDeletionModal({ setSelectedUser });

  return {
    currentMilliseconds,
    isCreationModalOpen,
    selectedImage,
    setSelectedImage,
    handleCreationModalOpen,
    selectedUser,
    isEditModalOpen,
    selectedImageForEdition,
    showEditionForm,
    isDeletionModalOpen,
    askForDeletionConfirmation,
    setIsCreationModalOpen,
    setIsEditModalOpen,
    setSelectedImageForEdition,
    setSelectedUser,
    setIsDeletionModalOpen,
  };
};
