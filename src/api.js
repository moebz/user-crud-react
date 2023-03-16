import axios from "axios";
import httpStatus from "http-status";
import TokenService from "./token.service";
import { history } from "./history";
import AuthService from "./auth.service";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["user-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    console.log('originalConfig', originalConfig);

    if (originalConfig.url !== "/auth/signin" && err.response) {
      if (err.response.status === httpStatus.UNAUTHORIZED) {
        if (!originalConfig._retry) {
          // Access token has expired, trying to get a new access token then retry the original request

          originalConfig._retry = true;

          try {
            const rs = await instance.post("/token/refresh", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);
          } catch (_error) {
            console.log('refreshFailed.logout');
            AuthService.logout();
            history.navigate("/login");
            // return Promise.reject(_error);
          }
        } else {
          // _retry is true and for some reason the API returned
          // "unauthorized" again, so this is the second time the API
          // returned an "unauthorized" error. We should redirect the
          // user to the login page.

          console.log('retryIsTrue.logout');

          AuthService.logout();
          history.navigate("/login");
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
