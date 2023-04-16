import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import {
  Alert,
  CircularProgress,
  Collapse,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "./api";
import { getCurrentMilliseconds, sleep } from "./utils";
import { green } from "@mui/material/colors";

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "username";

function Users() {
  const currentMilliseconds = getCurrentMilliseconds();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [users, setUsers] = useState({
    data: [],
    status: "IDLE",
  });
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUserCreationLoading, setIsUserCreationLoading] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isCreationFormAlertOpen, setIsCreationFormAlertOpen] = useState(false);
  const [creationFormAlertMessage, setCreationFormAlertMessage] = useState("");

  const [isUserEditLoading, setIsUserEditLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditFormAlertOpen, setIsEditFormAlertOpen] = useState(false);
  const [editFormAlertMessage, setEditFormAlertMessage] = useState("");

  const [isUserDeletionLoading, setIsUserDeletionLoading] = useState(false);
  const [isDeletionFormAlertOpen, setIsDeletionFormAlertOpen] = useState(false);
  const [deletionFormAlertMessage, setDeletionFormAlertMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("standard");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageForEdition, setSelectedImageForEdition] = useState(null);
  const imageInputRef = React.useRef();
  const editionImageInputRef = React.useRef();

  async function getUsersAndSetState(params) {
    try {
      setUsers((users) => ({ ...users, status: "LOADING" }));

      await sleep(3000);

      const result = await api.get("/users", {
        params,
      });
      console.log("getUsersAndSetState.result.data", result.data);

      if (result.data.data.rows) {
        setUsers({ data: result.data.data.rows, status: "DONE" });
      } else {
        setUsers({ data: [], status: "DONE" });
      }

      setCurrentPage(params.pageNumber);
      setTotal(parseInt(result.data.data.total, 10));
    } catch (error) {
      console.error(error);
      setUsers({ data: [], status: "ERROR" });
      setSnackbarMessage("There was an error trying to get the user list");
      setIsSnackbarOpen(true);
    }
  }

  useEffect(() => {
    getUsersAndSetState({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      filter,
      orderBy,
      orderDirection: order,
    });
  }, []);

  function handlePageChange(pageNumber) {
    getUsersAndSetState({
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      filter,
      orderBy,
      orderDirection: order,
    });
  }

  function handleApplyFilter() {
    getUsersAndSetState({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      filter,
      orderBy,
      orderDirection: order,
    });
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleEditModalClose() {
    setIsEditFormAlertOpen(false);
    setIsEditModalOpen(false);
  }

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function showEditionForm(user) {
    console.log("showEditionForm.user", user);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function showCreationForm() {
    setIsCreationModalOpen(true);
  }

  async function deleteUser() {
    try {
      setIsUserDeletionLoading(true);

      await sleep(3000);

      const result = await api.delete(`/users/${selectedUser.id}`);

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      setIsModalOpen(false);

      setSnackbarMessage("User deleted successfully");
    } catch (error) {
      console.error(error);

      setSnackbarMessage("There was an error deleting the user");

      if (error?.response?.data?.message) {
        setDeletionFormAlertMessage(error.response.data.message);
        setIsDeletionFormAlertOpen(true);
      }
    } finally {
      setIsUserDeletionLoading(false);
      setIsSnackbarOpen(true);
    }
  }

  async function editUser() {
    try {
      setIsUserEditLoading(true);

      const formData = new FormData();

      formData.append("avatar", selectedImageForEdition);
      formData.append("firstname", selectedUser.firstname);
      formData.append("lastname", selectedUser.lastname);
      formData.append("email", selectedUser.email);
      formData.append("username", selectedUser.username);
      formData.append("role", selectedUser.role);

      const result = await api.post(
        `/users/${selectedUser.id}/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      setIsEditModalOpen(false);
      setSnackbarMessage("User modified successfully");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("There was an error modifying the user");
      if (error?.response?.data?.message) {
        setEditFormAlertMessage(error.response.data.message);
        setIsEditFormAlertOpen(true);
      }
    } finally {
      setIsUserEditLoading(false);
      setIsSnackbarOpen(true);
    }
  }

  function cleanAndCloseCreationModal() {
    setIsCreationFormAlertOpen(false);
    setIsCreationModalOpen(false);
  }

  async function createUser() {
    try {
      setIsUserCreationLoading(true);

      const formData = new FormData();
      formData.append("avatar", selectedImage);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("passwd", password1);
      formData.append("passwd_confirmation", password2);
      formData.append("username", username);
      formData.append("role", role);

      const result = await api.post("/users/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("createUser.result", result);

      await getUsersAndSetState({
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        filter,
        orderBy,
        orderDirection: order,
      });

      cleanAndCloseCreationModal();

      setSnackbarMessage("User created successfully");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("An error occurred while trying to create the user");
      if (error?.response?.data?.message) {
        setCreationFormAlertMessage(error.response.data.message);
        setIsCreationFormAlertOpen(true);
      }
    } finally {
      setIsUserCreationLoading(false);
      setIsSnackbarOpen(true);
    }
  }

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

  function handleSortRequest(event, newOrderBy) {
    const isAsc = orderBy === newOrderBy && order === "asc";
    const toggledOrder = isAsc ? "desc" : "asc";
    setOrder(toggledOrder);
    setOrderBy(newOrderBy);

    getUsersAndSetState({
      pageNumber: currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
      filter,
      orderBy: newOrderBy,
      orderDirection: toggledOrder,
    });
  }

  function createSortHandler(newOrderBy) {
    return function (event) {
      handleSortRequest(event, newOrderBy);
    };
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const totalNumberOfPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <CssBaseline />

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      />

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            outline: 0,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete user
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>

          <Collapse in={isDeletionFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsDeletionFormAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {deletionFormAlertMessage}
            </Alert>
          </Collapse>

          <Box sx={{ position: "relative", mb: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={deleteUser}
              disabled={isUserDeletionLoading}
            >
              Delete
            </Button>
            {isUserDeletionLoading && (
              <CircularProgress
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
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            outline: 0,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit user
          </Typography>

          {selectedUser && (
            <>
              <TextField
                value={selectedUser.firstname}
                margin="normal"
                fullWidth
                label="First name"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstname: event.target.value,
                  })
                }
              />

              <TextField
                value={selectedUser.lastname}
                margin="normal"
                fullWidth
                label="Last name"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    lastname: event.target.value,
                  })
                }
              />

              <TextField
                value={selectedUser.username}
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete={currentMilliseconds}
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    username: event.target.value,
                  })
                }
              />

              <TextField
                value={selectedUser.email}
                margin="normal"
                fullWidth
                label="Email"
                onChange={(event) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: event.target.value,
                  })
                }
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="edition-role-select-label">Role</InputLabel>
                <Select
                  labelId="edition-role-select-label"
                  id="edition-role-select"
                  value={selectedUser.role}
                  label="Role"
                  onChange={(event) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: event.target.value,
                    })
                  }
                >
                  <MenuItem value={"standard"}>Standard</MenuItem>
                  <MenuItem value={"admin"}>Administrator</MenuItem>
                </Select>
              </FormControl>

              <input
                ref={editionImageInputRef}
                type="file"
                name="avatar"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImageForEdition(event.target.files[0]);
                }}
              />
            </>
          )}

          <Collapse in={isEditFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsEditFormAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {editFormAlertMessage}
            </Alert>
          </Collapse>

          <Box sx={{ position: "relative", mb: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={editUser}
              disabled={isUserEditLoading}
            >
              Save changes
            </Button>
            {isUserEditLoading && (
              <CircularProgress
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
        </Box>
      </Modal>

      <Modal
        open={isCreationModalOpen}
        onClose={cleanAndCloseCreationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            outline: 0,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New user
          </Typography>

          <TextField
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            margin="normal"
            fullWidth
            label="First name"
          />

          <TextField
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            margin="normal"
            fullWidth
            label="Last name"
          />

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
            label="Email"
          />

          <TextField
            value={username}
            autoComplete={currentMilliseconds}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
            required
            fullWidth
            label="Username"
          />

          <TextField
            value={password1}
            autoComplete={currentMilliseconds}
            onChange={(event) => setPassword1(event.target.value)}
            margin="normal"
            fullWidth
            label="New password"
            type="password"
          />

          <TextField
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            margin="normal"
            fullWidth
            label="Password confirmation"
            type="password"
            autoComplete={currentMilliseconds}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="creation-role-select-label">Role</InputLabel>
            <Select
              labelId="creation-role-select-label"
              id="creation-role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value={"standard"}>Standard</MenuItem>
              <MenuItem value={"admin"}>Administrator</MenuItem>
            </Select>
          </FormControl>

          {/* {selectedImage && (
            <div>
              <img
                alt="preview"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                onClick={() => {
                  imageInputRef.current.value = null;
                  setSelectedImage(null);
                }}
              >
                Remove
              </button>
            </div>
          )} */}

          <input
            ref={imageInputRef}
            type="file"
            name="avatar"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />

          <Collapse in={isCreationFormAlertOpen}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={cleanAndCloseCreationModal}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {creationFormAlertMessage}
            </Alert>
          </Collapse>

          <Box sx={{ position: "relative", mb: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={createUser}
              disabled={isUserCreationLoading}
            >
              Add
            </Button>
            {isUserCreationLoading && (
              <CircularProgress
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
        </Box>
      </Modal>

      <Title>User list</Title>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mb: 3 }}
        onClick={showCreationForm}
      >
        Add new user
      </Button>

      <TextField
        margin="normal"
        fullWidth
        label="Filter by name, username or email"
        onChange={(event) => setFilter(event.target.value)}
        autoComplete={currentMilliseconds}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mb: 3 }}
        onClick={handleApplyFilter}
      >
        Apply filter
      </Button>

      {users.status !== "ERROR" && totalNumberOfPages > 0 && (
        <Pagination
          count={totalNumberOfPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          disabled={users.status !== "DONE" ? true : false}
        />
      )}

      {users.status !== "DONE" && users.status !== "ERROR" && (
        <CircularProgress />
      )}

      {users.status === "ERROR" && (
        <Alert severity="error">
          There was an error trying to get the user list
        </Alert>
      )}

      {users.status === "DONE" && (
        <>
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
        </>
      )}
    </Container>
  );
}

export { Users };
