import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import api from "./api";

function getCurrentMilliseconds() {
  const currentMilliseconds = Date.now();
  return currentMilliseconds.toString();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const pageSize = 12;

function Users() {
  const currentMilliseconds = getCurrentMilliseconds();

  const [users, setUsers] = useState({
    data: [],
    status: "PENDING",
  });

  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = React.useRef();

  async function getUsersAndSetState(params) {
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
  }

  useEffect(() => {
    getUsersAndSetState({
      pageNumber: 1,
      pageSize,
      filter,
    });
  }, []);

  function handlePageChange(pageNumber) {
    getUsersAndSetState({
      pageNumber,
      pageSize,
      filter,
    });
  }

  function handleApplyFilter() {
    getUsersAndSetState({
      pageNumber: 1,
      pageSize,
      filter,
    });
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleEditModalClose() {
    setIsEditModalOpen(false);
  }

  function handleCreationModalClose() {
    setIsCreationModalOpen(false);
  }

  function askForDeletionConfirmation(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function showEditionForm(user) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  function showCreationForm() {
    setIsCreationModalOpen(true);
  }

  async function deleteUser() {
    const result = await api.delete(`/users/${selectedUser.id}`);
    await getUsersAndSetState({
      pageNumber: 1,
      pageSize,
      filter,
    });
    setIsModalOpen(false);
  }

  async function editUser() {
    const result = await api.put(`/users/${selectedUser.id}`, {
      firstname: selectedUser.firstname,
      lastname: selectedUser.lastname,
      email: selectedUser.email,
      username: selectedUser.username,
    });
    await getUsersAndSetState({
      pageNumber: 1,
      pageSize,
      filter,
    });
    setIsEditModalOpen(false);
  }

  async function createUser() {
    const formData = new FormData();
    formData.append("avatar", selectedImage);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("passwd", password1);
    formData.append("username", username);

    const result = await api.post("/users/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await getUsersAndSetState({
      pageNumber: 1,
      pageSize,
      filter,
    });

    setIsCreationModalOpen(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 3 }}
            onClick={deleteUser}
          >
            Yes, delete it
          </Button>
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
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 3 }}
            onClick={editUser}
          >
            Save changes
          </Button>
        </Box>
      </Modal>

      <Modal
        open={isCreationModalOpen}
        onClose={handleCreationModalClose}
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
            label="Password again"
            type="password"
            autoComplete={currentMilliseconds}
          />

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 3 }}
            onClick={createUser}
          >
            Save changes
          </Button>
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

      <Pagination
        count={Math.ceil(total / pageSize)}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.username}</TableCell>
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
    </Container>
  );
}

export { Users };
