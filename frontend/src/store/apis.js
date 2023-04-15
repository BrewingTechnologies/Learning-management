import axios from "axios";

import config from "../config/index";
import { handleLogin } from "../utils/authentication";

const API_URL = config.RestServiceURL;

export const loginUser = async (userData) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}users/login`, userData)
      .then((res) => {
        handleLogin(res.data);
        resolve(true);
      })
      .catch((err) => {
        console.log("err", err.response, err);
        resolve(false);
      });
  });
};

export const fetchInstructorCourses = (id) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}courses/${id}/instructore`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve([]);
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

export const getCourseDetails = (courseId) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}courses/${courseId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve();
      });
  });
};
