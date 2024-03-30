import React, { useState } from "react";

export const useUserCreationModal = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function handleCreationModalOpen() {
    setSelectedImage(null);
    setIsCreationModalOpen(true);
  }

  return {
    isCreationModalOpen,
    setIsCreationModalOpen,
    selectedImage,
    setSelectedImage,
    handleCreationModalOpen,
  };
};
