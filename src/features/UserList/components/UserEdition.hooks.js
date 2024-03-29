import { useState } from "react";
import api from "../../../utils/api";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";

export const useUsersEdition = ({
  getUsersAndSetState,
  filter,
  orderBy,
  order,
  setSnackbarMessage,
  setIsSnackbarOpen,
  editionImageInputRef,
  setIsEditModalOpen,
  selectedImageForEdition,
  setSelectedImageForEdition,
  selectedUser,
  setSelectedUser,
}) => {
  const [isUserEditLoading, setIsUserEditLoading] = useState(false);
  const [isEditFormAlertOpen, setIsEditFormAlertOpen] = useState(false);
  const [editFormAlertMessage, setEditFormAlertMessage] = useState("");

  const [markForChange, setMarkForChange] = useState(false);
  const [markForDeletion, setMarkForDeletion] = useState(false);

  async function editUser() {
    try {
      setIsUserEditLoading(true);

      const formData = new FormData();

      formData.append("avatar", selectedImageForEdition);

      if (markForDeletion) {
        formData.append("deleteavatar", "y");
      }

      formData.append("firstname", selectedUser.firstname);
      formData.append("lastname", selectedUser.lastname);
      formData.append("email", selectedUser.email);
      formData.append("username", selectedUser.username);
      formData.append("role", selectedUser.role);

      await api.post(`/users/${selectedUser.id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      setIsEditModalOpen(false);
      setSnackbarMessage("User modified successfully");
      cleanAndCloseEditionModal();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("There was an error modifying the user");
      if (error?.response?.data?.message) {
        setEditFormAlertMessage(error.response.data.message);
        setIsEditFormAlertOpen(true);
      }
    } finally {
      setIsUserEditLoading(false);
      setIsSnackbarOpen(true);
    }
  }

  function cleanAndCloseEditionModal() {
    setMarkForDeletion(false);
    setMarkForChange(false);
    setIsEditFormAlertOpen(false);
    setEditFormAlertMessage("");
    setIsEditModalOpen(false);
  }

  function resetEditionImageInput() {
    if (editionImageInputRef?.current?.value) {
      editionImageInputRef.current.value = "";
    }

    setSelectedImageForEdition(null);
    setMarkForChange(false);
  }

  return {
    isUserEditLoading,
    isEditFormAlertOpen,
    setIsEditFormAlertOpen,
    editFormAlertMessage,
    markForChange,
    setMarkForChange,
    markForDeletion,
    setMarkForDeletion,
    editUser,
    resetEditionImageInput,
    cleanAndCloseEditionModal,
  };
};
