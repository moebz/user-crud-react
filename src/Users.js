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
    });
  }, []);

  function handlePageChange(pageNumber) {
    getUsersAndSetState({
      pageNumber,
      pageSize,
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Title>Recent Orders</Title>
      <Pagination
        count={total}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>prueba</TableCell>
              <TableCell align="right">prueba</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Container>
  );
}

export { Users };
