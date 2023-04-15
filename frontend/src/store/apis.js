import axios from "axios";

import config from "../config/index";
import { handleLogin } from "../utils/authentication";

const API_URL = config.RestServiceURL;

export const loginUser = (userData) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}users/login`, userData)
      .then((res) => {
        handleLogin(res.data);
        resolve(true);
      })
      .catch((err) => {
        resolve(false);
      });
  });
};

export const fetchAllCourses = () => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}courses`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve([]);
      });
  });
};

export const resetForgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios.put(`${API_URL}users/forgot-password-otp`, { email }).then((res) => resolve(res.data)).catch((err) => reject(err));
  })
}

export const updatePassword = (data) => {
  return new Promise((resolve) => {
    axios.put(`${API_URL}users/update-password`, { ...data }).then((res) => res.data).catch((err) => resolve(err))
  })
}