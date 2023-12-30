import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Avatar,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function FileInput({
  imageInputRef,
  selectedImage,
  setSelectedImage,
  setMarkForChange,
  openImageSelection,
  reset,
}) {
  console.log({
    "FileInput.imageInputRef": imageInputRef,
    "FileInput.selectedImage": selectedImage,
  });

  const [preview, setPreview] = useState("");

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const onSelectFile = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        name="avatar"
        style={{ display: "none" }}
        onChange={onSelectFile}
      />

      <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
        <Avatar
          alt="Preview"
          src={preview}
          children={<PersonIcon sx={{ width: 40, height: 40 }} />}
          sx={{ width: 56, height: 56 }}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Button onClick={openImageSelection} variant="outlined">
          Select an image
        </Button>

        <Button onClick={reset} variant="outlined" color="secondary">
          Cancel
        </Button>
      </Stack>
    </>
  );
}

export { FileInput };
