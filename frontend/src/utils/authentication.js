import axios from "axios";
import jwt_decode from "jwt-decode";
import { getLogoutURL } from "./helperMethods";

let role = null;
let userInfo = {};

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
    token = localStorage.getItem("authorization");
    setCommonHeaders({ authorization: token });
  }
  if (!token) {
    userInfo = {};
    setRole(null);
    return userInfo;
  } else {
    userInfo = jwt_decode(token);
    setRole(userInfo["custom:role"]);
    setUnAuthenticationInterceptor();
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
  const { IdToken, AccessToken } = authenticationResult || {};
  localStorage.setItem("authorization", authenticationResult.IdToken);
  setCommonHeaders({
    authorization: IdToken,
    accessControlToken: AccessToken,
  });
  decodeUserInfo(IdToken);
}
