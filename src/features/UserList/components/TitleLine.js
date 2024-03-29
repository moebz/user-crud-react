import React from "react";

import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Title from "../../../components/Title";

function TitleLine({ showCreationForm }) {
  return (
    <Grid
      container
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Title>User list</Title>

      <Button
        type="submit"
        variant="contained"
        sx={{ mb: 3 }}
        onClick={showCreationForm}
        data-testid="create-user-button"
      >
        Add new user
      </Button>
    </Grid>
  );
}

export { TitleLine };
