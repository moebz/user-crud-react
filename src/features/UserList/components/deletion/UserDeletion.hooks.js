import { useState } from "react";
import api from "../../../../utils/api";
import { DEFAULT_PAGE_SIZE } from "../../../../utils/constants";

export const useUsersDeletion = ({
  loadFirstPage,
  setSnackbarMessage,
  setIsSnackbarOpen,
  setIsDeletionModalOpen,
  selectedUser,
}) => {

  const [isUserDeletionLoading, setIsUserDeletionLoading] = useState(false);
  const [isDeletionFormAlertOpen, setIsDeletionFormAlertOpen] = useState(false);
  const [deletionFormAlertMessage, setDeletionFormAlertMessage] = useState("");

  async function deleteUser() {
    try {
      setIsUserDeletionLoading(true);

      await api.delete(`/users/${selectedUser.id}`);

      await loadFirstPage();

      setIsDeletionModalOpen(false);

      setSnackbarMessage("User deleted successfully");
    } catch (error) {
      console.error(error);

      setSnackbarMessage("There was an error deleting the user");

      if (error?.response?.data?.message) {
        setDeletionFormAlertMessage(error.response.data.message);
        setIsDeletionFormAlertOpen(true);
      }
    } finally {
      setIsUserDeletionLoading(false);
      setIsSnackbarOpen(true);
    }
  }

  return {
    isUserDeletionLoading,
    isDeletionFormAlertOpen,
    setIsDeletionFormAlertOpen,
    deletionFormAlertMessage,
    deleteUser,
  };
};
