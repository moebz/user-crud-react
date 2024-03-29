import { useState, useEffect } from "react";
import { authService } from "./authService";
import api from "./../utils/api";

function useCurrentUserData() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  const requestUserDataAndSaveItInState = async (user) => {
    const userData = await api.get(`/users/${user.decodedToken.id}`);
    setCurrentUserData(userData.data.data[0]);
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);

      if (!currentUserData) {
        requestUserDataAndSaveItInState(user);
      }
    }
  }, [currentUserData]);

  return {
    currentUser,
    setCurrentUser,
    currentUserData,
    setCurrentUserData,
  };
}

export default useCurrentUserData;
