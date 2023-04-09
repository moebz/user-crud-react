import jwtDecode from "jwt-decode";

import api from "./api";

import { history } from "./history";

const login = async (username, passwd, setCurrentUser) => {
  const response = await api.post("/login", {
    username,
    passwd,
  });

  console.log("login.response.data", response.data);

  if (response?.data?.data?.accessToken) {
    console.log("login.setInLocalStorage");

    const userDataToSet = response.data.data;

    // Store in localStorage

    setUser(userDataToSet);

    // Set in App state

    setCurrentUser(userDataToSet);
  } else {
    console.log("login.notSettingInLocalStorage");
    throw new Error("Login didn't return necessary data");
  }
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
  console.log("setUser.originalUserData", JSON.stringify(user));

  const decodedToken = jwtDecode(user.accessToken);
  console.log("decodedToken", decodedToken);
  
  user.decodedToken = decodedToken;

  console.log("setUser.modifiedUserData", JSON.stringify(user));

  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  const user = getUser();
  return Boolean(user);
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
