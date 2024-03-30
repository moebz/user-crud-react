import { useState } from "react";
import api from "../../../../utils/api";

export const useUserCreation = ({
  setSnackbarMessage,
  setIsSnackbarOpen,
  setIsCreationModalOpen,
  loadFirstPage,
  selectedImage,
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

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  function handleModalClose() {
    setIsCreationFormAlertOpen(false);
    setCreationFormAlertMessage("");
    setIsCreationModalOpen(false);
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

      await loadFirstPage();

      cleanAndCloseCreationModal();

      setSnackbarMessage("User created successfully");
    } catch (error) {
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
    handleModalClose,
    createUser,
    cleanAndCloseCreationModal,
    handleRoleChange,
  };
};
