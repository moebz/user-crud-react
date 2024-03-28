import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";

function ButtonWithLoader({
  type = undefined,
  onButtonClick = undefined,
  isLoading,
  disableWhenLoading = true,
  buttonText,
  dataTestId,
  loaderDataTestId,
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        fullWidth
        type={type}
        variant="contained"
        onClick={onButtonClick}
        disabled={disableWhenLoading ? isLoading : false}
        data-testid={dataTestId}
      >
        {buttonText}
      </Button>
      {isLoading && (
        <CircularProgress
          data-testid={loaderDataTestId}
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}

export { ButtonWithLoader };
