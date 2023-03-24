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
import api from "./api";

function preventDefault(event) {
  event.preventDefault();
}

const pageSize = 12;

function Users() {
  const [users, setUsers] = useState({
    data: [],
    status: "PENDING",
  });

  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [total, setTotal] = useState(0);

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Title>User list</Title>

      <TextField
        margin="normal"
        fullWidth
        id="filter"
        label="Filter by name, username or email"
        onChange={(event) => setFilter(event.target.value)}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export { Users };
