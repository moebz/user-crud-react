import React, { useState } from "react";

export const useUserDeletionModal = ({ setSelectedUser }) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsDeletionModalOpen(true);
  }

  return {
    isDeletionModalOpen,
    setIsDeletionModalOpen,
    askForDeletionConfirmation,
  };
};
