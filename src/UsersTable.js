import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Alert, CircularProgress, Stack, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

// First name
// Last name
// Username
// Email

const headCells = [
  {
    id: "firstname",
    numeric: false,
    disablePadding: false,
    label: "First name",
    withSort: true,
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
    label: "Last name",
    withSort: true,
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
    withSort: true,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    withSort: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
    withSort: false,
  },
];

function UsersTable({
  users,
  currentPage,
  handlePageChange,
  totalNumberOfPages,
  order,
  orderBy,
  createSortHandler,
  askForDeletionConfirmation,
  showEditionForm,
}) {
  return (
    <>
      {users.status !== "ERROR" && totalNumberOfPages > 0 && (
        <Stack alignItems="center">
          <Pagination
            count={totalNumberOfPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            disabled={users.status !== "DONE" ? true : false}
          />
        </Stack>
      )}

      {users.status !== "DONE" && users.status !== "ERROR" && (
        <CircularProgress />
      )}

      {users.status === "ERROR" && (
        <Alert severity="error">
          There was an error trying to get the user list
        </Alert>
      )}

      {users.status === "DONE" && !users?.data?.length && (
        <Alert severity="info">No users to show</Alert>
      )}

      {users.status === "DONE" && !!users?.data?.length && (
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "normal"}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      {headCell.withSort ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 3 }}
                        onClick={() => askForDeletionConfirmation(row)}
                      >
                        Delete
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 3 }}
                        onClick={() => showEditionForm(row)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
}

export { UsersTable };
