import axios from "axios";
import httpStatus from "http-status";
import { authService } from "./authService";

const axiosConfig = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(axiosConfig);

const responseSuccessInterceptor = (res) => {
  return res;
};

const responseErrorInterceptor = async (err) => {
  const originalConfig = err.config;

  if (!originalConfig) {
    return Promise.reject(err);
  }

  console.log("originalConfig", originalConfig);

  if (
    originalConfig.url === "/login" ||
    !err?.response ||
    err.response.status !== httpStatus.UNAUTHORIZED
  ) {
    return Promise.reject(err);
  }

  if (originalConfig._retry) {
    // _retry is true. This means for some reason the API returned
    // "unauthorized" again, so this is the second time the API
    // returned an "unauthorized" error. We should redirect the
    // user to the login page.

    console.log("retryIsTrue.logout");
    authService.logoutAndRedirectToLogin();
    return;
  }

  // Access token has expired, try to get a new
  // access token then retry the original request.

  originalConfig._retry = true;

  try {
    const refreshResult = await instance.post("/token/refresh", {
      refreshToken: authService.getLocalRefreshToken(),
    });

    const { accessToken } = refreshResult.data;
    authService.updateLocalAccessToken(accessToken);

    return instance(originalConfig);
  } catch (_error) {
    console.log("refreshFailed.logout");
    authService.logoutAndRedirectToLogin();
  }
};

const requestSuccessInterceptor = (config) => {
  const token = authService.getLocalAccessToken();
  if (token) {
    config.headers["access-token"] = token;
  }
  return config;
};

const requestErrorInterceptor = (error) => {
  return Promise.reject(error);
};

instance.interceptors.request.use(
  requestSuccessInterceptor,
  requestErrorInterceptor
);

instance.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);

export default instance;
