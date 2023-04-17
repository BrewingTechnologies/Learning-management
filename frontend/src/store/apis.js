import axios from "axios";

import config from "../config/index";
import { handleLogin, userInfo } from "../utils/authentication";

const API_URL = config.RestServiceURL;

export const loginUser = (userData) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}/users/login`, userData)
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
      .get(`${API_URL}/courses`)
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
    axios
      .put(`${API_URL}/users/forgot-password-otp`, { email })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const updatePassword = (data) => {
  return new Promise((resolve) => {
    axios
      .put(`${API_URL}/users/update-password`, { ...data })
      .then((res) => resolve(res.data))
      .catch((err) => resolve(err));
  });
};

export const fetchInstructorCourses = (id) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/courses/${id}/instructor`)
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
      .get(`${API_URL}/courses/${courseId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve();
      });
  });
};

export const addCourse = (data) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}/courses`, data)
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => resolve({ status: false }));
  });
};

export const deleteUserCourse = (data) => {
  return new Promise((resolve) => {
    axios
      .delete(`${API_URL}/courses/${data}`)
      .then((res) => resolve(true))
      .catch((err) => resolve(false));
  });
};

export const updateUserBookmark = (data) => {
  return new Promise((resolve) => {
    axios
      .put(
        `${API_URL}/courses/${data.courseId}/bookmark/${userInfo._id}?isFav=${data.bookmark}`
      )
      .then((res) => resolve(res.data))
      .catch((err) => resolve(err));
  });
};
