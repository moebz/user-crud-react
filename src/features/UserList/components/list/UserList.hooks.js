import { useState, useEffect } from "react";
import api from "../../../../utils/api";
import {
  DEFAULT_ORDER,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE,
} from "../../../../utils/constants";
import { useSnackbar } from "../../../../utils/useSnackbar";

export function useUsersList({ setIsSnackbarOpen, setSnackbarMessage }) {
  const [users, setUsers] = useState({
    data: [],
    status: "IDLE",
  });

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);

  const totalNumberOfPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

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

  async function loadFirstPage() {
    await getUsersAndSetState({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      filter,
      orderBy,
      orderDirection: order,
    });
  }

  return {
    users,
    filter,
    setFilter,
    currentPage,
    total,
    order,
    orderBy,
    handlePageChange,
    handleApplyFilter,
    clearFilter,
    createSortHandler,
    totalNumberOfPages,
    loadFirstPage,
  };
}
