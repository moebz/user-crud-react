import api from "./api";

const API_URL = "http://localhost:8080/api/auth/";

const login = async (username, passwd) => {
  // return await new Promise((resolve, reject) => {
  //   const userData = {
  //     username: 'asdf',
  //   };
  //   setUser(userData);
  //   setTimeout(() => resolve(userData), 2000);
  // });

  return api
    .post("/login", {
      username,
      passwd,
    })
    .then((response) => {
      console.log("login.response.data", response.data);

      if (response?.data?.data?.userToken) {
        console.log("login.setInLocalStorage");

        localStorage.setItem("user", JSON.stringify(response.data.data));
      } else {
        console.log("login.notSettingInLocalStorage");
        throw new Error("Login didn't return necessary data");
      }

      return response.data;
    });
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
  console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
};

export default AuthService;
