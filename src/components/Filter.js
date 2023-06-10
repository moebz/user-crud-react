import React from "react";

import { Button, Stack, TextField } from "@mui/material";

function Filter({
  setFilter,
  currentMilliseconds,
  filter,
  handleApplyFilter,
  clearFilter,
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "flex-start", sm: "center" }}
      alignItems="center"
      spacing={2}
      sx={{ mb: 4 }}
    >
      <TextField
        margin="normal"
        label="Filter by name, username or email"
        onChange={(event) => setFilter(event.target.value)}
        autoComplete={currentMilliseconds}
        value={filter}
        sx={{ minWidth: 210, maxWidth: 400 }}
        fullWidth
      />

      <Stack
        direction={{ xs: "row", sm: "row" }}
        justifyContent={{ xs: "flex-start" }}
        alignSelf={{ xs: "center", sm: "center" }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleApplyFilter}
          sx={{ mr: 1 }}
        >
          Apply
        </Button>

        <Button type="submit" variant="text" onClick={clearFilter}>
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

export { Filter };
