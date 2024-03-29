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

  const [isUserCreationLoading, setIsUserCreationLoading] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isCreationFormAlertOpen, setIsCreationFormAlertOpen] = useState(false);
  const [creationFormAlertMessage, setCreationFormAlertMessage] = useState("");

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

  function handleModalClose() {
    setIsCreationFormAlertOpen(false);
    setCreationFormAlertMessage("");
    setIsModalOpen(false);
  }

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

  function showCreationForm() {
    setSelectedImage(null);
    setIsCreationModalOpen(true);
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

  function cleanAndCloseCreationModal() {
    setIsCreationFormAlertOpen(false);
    setCreationFormAlertMessage("");
    setIsCreationModalOpen(false);
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

  async function createUser() {
    try {
      setIsUserCreationLoading(true);

      const formData = new FormData();
      formData.append("avatar", selectedImage);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("passwd", password1);
      formData.append("passwd_confirmation", password2);
      formData.append("username", username);
      formData.append("role", role);

      // await sleep(1000);

      // throw { response: { data: { message: "prueba" } } };

      const result = await api.post("/users/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      cleanAndCloseCreationModal();

      setSnackbarMessage("User created successfully");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("An error occurred while trying to create the user");
      if (error?.response?.data?.message) {
        setCreationFormAlertMessage(error.response.data.message);
        setIsCreationFormAlertOpen(true);
      }
    } finally {
      setIsUserCreationLoading(false);
      setIsSnackbarOpen(true);
    }
  }

  return {
    selectedUser,
    setSelectedUser,
    isModalOpen,
    isUserCreationLoading,
    isCreationModalOpen,
    isCreationFormAlertOpen,
    setIsCreationFormAlertOpen,
    creationFormAlertMessage,
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
    handleModalClose,
    handleEditModalClose,
    askForDeletionConfirmation,
    showEditionForm,
    showCreationForm,
    deleteUser,
    editUser,
    resetEditionImageInput,
    createUser,
    cleanAndCloseEditionModal,
    cleanAndCloseCreationModal,
  };
};
