import axios from "axios";
import { getLogoutURL } from "./helperMethods";

let role = null;
export let userInfo = {};

export function getUserInfo() {
  return userInfo;
}

export function setRole(roleName) {
  role = roleName;
}

/**@description set common headers in axios
 *@author Anusha Gurajapu
 */
export function setCommonHeaders(params) {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    authorization: params.authorization,
    // accessControlToken: params.accessControlToken,
  };
}

/**@description Remove common headers in axios
 *@author Anusha Gurajapu
 */
export function clearCommonHeaders() {
  delete axios.defaults.headers.common.authorization;
  delete axios.defaults.headers.common.accessControlToken;
}

export function handleLogout() {
  localStorage.clear();
  clearCommonHeaders();
  setRole(null);
  return getLogoutURL();
}

export function setUnAuthenticationInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = handleLogout();
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}

export function decodeUserInfo(token) {
  if (!token) {
    token = localStorage.getItem("data");
  }
  if (!token) {
    userInfo = {};
    setRole(null);
    return userInfo;
  } else {
    userInfo = JSON.parse(token);
    setRole(userInfo.role);
    setUnAuthenticationInterceptor();
    setCommonHeaders({ authorization: token.authToken });
    return userInfo;
  }
}

export function getRole() {
  if (!role) {
    decodeUserInfo();
  }
  return role;
}

export function handleLogin(authenticationResult = {}) {
  const { authToken } = authenticationResult || {};
  localStorage.setItem("authorization", authToken);
  localStorage.setItem("data", JSON.stringify(authenticationResult));
  setCommonHeaders({
    authorization: authToken,
  });
  decodeUserInfo(authenticationResult);
}
