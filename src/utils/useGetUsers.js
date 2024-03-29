import { useState, useEffect } from "react";
import api from "./api";
import {
  DEFAULT_ORDER,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE,
} from "./constants";

function useGetUsers({ setSnackbarMessage, setIsSnackbarOpen }) {
  const [users, setUsers] = useState({
    data: [],
    status: "IDLE",
  });
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);

  async function getUsersAndSetState(params) {
    try {
      setUsers((users) => ({ ...users, status: "LOADING" }));
      const result = await api.get("/users", {
        params,
      });

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

  return {
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
  };
}

export default useGetUsers;
