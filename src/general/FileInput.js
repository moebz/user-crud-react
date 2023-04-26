import * as React from "react";
import Button from "@mui/material/Button";

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
      <Button
        onClick={() => imageInputRef?.current?.click()}
        variant="contained"
      >
        Upload
      </Button>
      <span style={{ marginLeft: 10 }}>
        {selectedImage
          ? `Selected file: ${selectedImage.name}`
          : "No file selected"}
      </span>
    </>
  );
}

export { FileInput };
