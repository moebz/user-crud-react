import { useState } from "react";
import api from "../../../utils/api";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";

export const useUsersCUD = ({
  getUsersAndSetState,
  filter,
  orderBy,
  order,
  setSnackbarMessage,
  setIsSnackbarOpen,
  editionImageInputRef,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUserEditLoading, setIsUserEditLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditFormAlertOpen, setIsEditFormAlertOpen] = useState(false);
  const [editFormAlertMessage, setEditFormAlertMessage] = useState("");

  const [isUserDeletionLoading, setIsUserDeletionLoading] = useState(false);
  const [isDeletionFormAlertOpen, setIsDeletionFormAlertOpen] = useState(false);
  const [deletionFormAlertMessage, setDeletionFormAlertMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("standard");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageForEdition, setSelectedImageForEdition] = useState(null);

  const [markForChange, setMarkForChange] = useState(false);
  const [markForDeletion, setMarkForDeletion] = useState(false);

  function handleEditModalClose() {
    setIsEditFormAlertOpen(false);
    setEditFormAlertMessage("");
    setIsEditModalOpen(false);
  }

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function showEditionForm(user) {
    setSelectedUser(user);
    setSelectedImageForEdition(null);
    setIsEditModalOpen(true);
  }

  async function deleteUser() {
    try {
      setIsUserDeletionLoading(true);

      await api.delete(`/users/${selectedUser.id}`);

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      setIsModalOpen(false);

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

    setSelectedImage(null);
    setMarkForChange(false);
  }

  return {
    selectedUser,
    setSelectedUser,
    isModalOpen,
    isUserEditLoading,
    isEditModalOpen,
    isEditFormAlertOpen,
    setIsEditFormAlertOpen,
    editFormAlertMessage,
    isUserDeletionLoading,
    isDeletionFormAlertOpen,
    setIsDeletionFormAlertOpen,
    deletionFormAlertMessage,
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
    setRole,
    selectedImage,
    setSelectedImage,
    selectedImageForEdition,
    setSelectedImageForEdition,
    markForChange,
    setMarkForChange,
    markForDeletion,
    setMarkForDeletion,
    handleEditModalClose,
    askForDeletionConfirmation,
    showEditionForm,
    deleteUser,
    editUser,
    resetEditionImageInput,
    cleanAndCloseEditionModal,
  };
};
