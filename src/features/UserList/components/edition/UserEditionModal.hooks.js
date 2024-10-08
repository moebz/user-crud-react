import React, { useState } from "react";

export const useUserEditionModal = ({ setSelectedUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageForEdition, setSelectedImageForEdition] = useState(null);

  function handleEditionModalOpen(user) {
    setSelectedUser(user);
    setSelectedImageForEdition(null);
    setIsEditModalOpen(true);
  }

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    selectedImageForEdition,
    setSelectedImageForEdition,
    handleEditionModalOpen,
  };
};
