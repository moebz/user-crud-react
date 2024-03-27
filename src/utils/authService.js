import jwtDecode from "jwt-decode";

import api from "./api";

import { history } from "./history";

const login = async (username, passwd) => {
  const response = await api.post("/login", {
    username,
    passwd,
  });

  if (!response?.data?.data?.accessToken) {
    throw new Error("Login didn't return necessary data");
  }

  const userDataToSet = response.data.data;

  return userDataToSet;
};

const logout = () => {
  removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  const decodedToken = jwtDecode(user.accessToken);

  user.decodedToken = decodedToken;

  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  const user = getUser();

  if (!user) {
    logout();
    return false;
  }

  const refreshToken = user?.refreshToken;

  if (!refreshToken) {
    logout();
    return false;
  }

  let decodedToken = jwtDecode(refreshToken);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    logout();
    return false;
  }

  return true;
};

const logoutAndRedirectToLogin = () => {
  logout();
  history.navigate("/login");
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  isLoggedIn,
  logoutAndRedirectToLogin,
};

export { authService };
