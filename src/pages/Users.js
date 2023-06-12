import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Title from "./../components/Title";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import api from "./../utils/api";
import { getCurrentMilliseconds, sleep } from "./../utils/utils";
import { UsersTable } from "./../components/UsersTable";
import { DeletionModal } from "./../components/DeletionModal";
import { CreationModal } from "./../components/CreationModal";
import { EditionModal } from "./../components/EditionModal";
import { Filter } from "./../components/Filter";
import useGetUsers from "../utils/useGetUsers";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";

function Users() {
  const currentMilliseconds = getCurrentMilliseconds();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    users,
    filter,
    setFilter,
    currentPage,
    total,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    getUsersAndSetState,
  } = useGetUsers({ setIsSnackbarOpen, setSnackbarMessage });

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

  function clearFilter() {
    setFilter("");
    getUsersAndSetState({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      filter: "",
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

      await api.post(`/users/${selectedUser.id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
    <Container component="main" sx={{ marginTop: 2 }}>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      />

      <DeletionModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        isDeletionFormAlertOpen={isDeletionFormAlertOpen}
        setIsDeletionFormAlertOpen={setIsDeletionFormAlertOpen}
        deletionFormAlertMessage={deletionFormAlertMessage}
        deleteUser={deleteUser}
        isUserDeletionLoading={isUserDeletionLoading}
      />

      <EditionModal
        currentMilliseconds={currentMilliseconds}
        isEditModalOpen={isEditModalOpen}
        handleEditModalClose={handleEditModalClose}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        editionImageInputRef={editionImageInputRef}
        selectedImageForEdition={selectedImageForEdition}
        setSelectedImageForEdition={setSelectedImageForEdition}
        isEditFormAlertOpen={isEditFormAlertOpen}
        setIsEditFormAlertOpen={setIsEditFormAlertOpen}
        editFormAlertMessage={editFormAlertMessage}
        editUser={editUser}
        isUserEditLoading={isUserEditLoading}
      />

      <CreationModal
        isCreationModalOpen={isCreationModalOpen}
        cleanAndCloseCreationModal={cleanAndCloseCreationModal}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        email={email}
        setEmail={setEmail}
        username={username}
        currentMilliseconds={currentMilliseconds}
        setUsername={setUsername}
        password1={password1}
        setPassword1={setPassword1}
        password2={password2}
        setPassword2={setPassword2}
        role={role}
        handleRoleChange={handleRoleChange}
        imageInputRef={imageInputRef}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        isCreationFormAlertOpen={isCreationFormAlertOpen}
        creationFormAlertMessage={creationFormAlertMessage}
        createUser={createUser}
        isUserCreationLoading={isUserCreationLoading}
      />

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
        >
          Add new user
        </Button>
      </Grid>

      <Filter
        setFilter={setFilter}
        currentMilliseconds={currentMilliseconds}
        filter={filter}
        handleApplyFilter={handleApplyFilter}
        clearFilter={clearFilter}
      />

      <UsersTable
        users={users}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalNumberOfPages={totalNumberOfPages}
        order={order}
        orderBy={orderBy}
        createSortHandler={createSortHandler}
        askForDeletionConfirmation={askForDeletionConfirmation}
        showEditionForm={showEditionForm}
      />
    </Container>
  );
}

export { Users };
