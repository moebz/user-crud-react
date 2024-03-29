import { useState } from "react";
import api from "../../../utils/api";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";

export const useUserCreation = ({
  getUsersAndSetState,
  filter,
  orderBy,
  order,
  setSnackbarMessage,
  setIsSnackbarOpen,
  setIsCreationModalOpen,
  selectedImage,
  setIsModalOpen,
}) => {
  const [isUserCreationLoading, setIsUserCreationLoading] = useState(false);
  const [isCreationFormAlertOpen, setIsCreationFormAlertOpen] = useState(false);
  const [creationFormAlertMessage, setCreationFormAlertMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("standard");

  const [markForChange, setMarkForChange] = useState(false);
  const [markForDeletion, setMarkForDeletion] = useState(false);

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  function handleModalClose() {
    setIsCreationFormAlertOpen(false);
    setCreationFormAlertMessage("");
    setIsModalOpen(false);
  }

  function cleanAndCloseCreationModal() {
    setIsCreationFormAlertOpen(false);
    setCreationFormAlertMessage("");
    setIsCreationModalOpen(false);
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
    isUserCreationLoading,
    isCreationFormAlertOpen,
    setIsCreationFormAlertOpen,
    creationFormAlertMessage,
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
    markForChange,
    setMarkForChange,
    markForDeletion,
    setMarkForDeletion,
    handleModalClose,
    createUser,
    cleanAndCloseCreationModal,
    handleRoleChange,
  };
};
