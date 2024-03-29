import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../../utils/authService";
import api from "../../../utils/api";

export const useLoginForm = ({ setCurrentUser, setCurrentUserData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Get the form data.

      const data = new FormData(event.currentTarget);

      // Try to login.

      const loginData = await authService.login(
        data.get("username"),
        data.get("password")
      );

      // Store login data in localStorage.

      authService.setUser(loginData);

      // Store login data in App state.

      setCurrentUser(loginData);

      // Get additional user data.

      const currentUser = authService.getCurrentUser();

      const userData = await api.get(`/users/${currentUser.decodedToken.id}`);

      // Store in App state and navigate home.

      setCurrentUserData(userData.data.data);

      navigate("/home");
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setAlertMessage(resMessage);
      openAlert();
    } finally {
      setLoading(false);
    }
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return {
    loading,
    isAlertOpen,
    alertMessage,
    handleSubmit,
    openAlert,
    closeAlert,
  };
};
