import jwtDecode from "jwt-decode";

import api from "./api";

const login = async (username, passwd) => {
  const response = await api.post("/login", {
    username,
    passwd,
  });

  console.log("login.response.data", response.data);

  if (response?.data?.data?.userToken) {
    console.log("login.setInLocalStorage");
    setUser(response.data.data);
  } else {
    console.log("login.notSettingInLocalStorage");
    throw new Error("Login didn't return necessary data");
  }

  return response.data;
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
  console.log("setUser", JSON.stringify(user));

  const decodedToken = jwtDecode(user.userToken);

  console.log("decodedToken", decodedToken);
  user.decodedToken = decodedToken;
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  const user = getUser();
  return Boolean(user);
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
};

export { authService };
