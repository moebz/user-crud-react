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

function CurrentProfilePicture({
  currentImageUrl,
  markForDeletion,
  setMarkForDeletion,
  openImageSelection,
}) {
  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
        <Avatar
          alt="Current profile picture"
          src={currentImageUrl}
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
        <Button
          onClick={() => setMarkForDeletion(!markForDeletion)}
          variant="outlined"
          color={markForDeletion ? "primary" : "warning"}
        >
          {markForDeletion ? "Cancel" : "Delete"}
        </Button>
        {!markForDeletion && (
          <Button
            onClick={openImageSelection}
            variant="outlined"
            color="secondary"
          >
            Change
          </Button>
        )}
      </Stack>
    </>
  );
}

export { CurrentProfilePicture };
