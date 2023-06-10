import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Landing() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
    </Container>
  );
}

export { Landing };
