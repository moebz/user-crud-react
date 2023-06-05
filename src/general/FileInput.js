import * as React from "react";
import Button from "@mui/material/Button";
import { Card, CardContent, Stack, Typography } from "@mui/material";

function FileInput({ imageInputRef, selectedImage, setSelectedImage }) {
  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        name="avatar"
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />

      <Card sx={{ minWidth: 162, mb: 2 }} variant="outlined">
        <CardContent>
          <Typography
            sx={{
              // backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
            color="text.secondary"
          >
            Profile photo
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Button
              onClick={() => imageInputRef?.current?.click()}
              variant="outlined"
            >
              {selectedImage ? "Change file" : "Select file"}
            </Button>

            {!selectedImage && (
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "150px",
                  overflowY: "auto",
                  wordBreak: "break-all",
                }}
              >
                No file selected
              </Typography>
            )}

            {selectedImage && (
              <Typography
                sx={{
                  // backgroundColor: "red",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Selected file:
              </Typography>
            )}

            {selectedImage && (
              <div
                style={{
                  // backgroundColor: "purple",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    // backgroundColor: "pink",
                    maxHeight: "75px",
                    maxWidth: "250px",
                    overflowY: "auto",
                    wordBreak: "break-all",
                  }}
                >
                  {selectedImage.name}
                </Typography>
              </div>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export { FileInput };
