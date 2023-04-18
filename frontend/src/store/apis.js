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
        resolve({ status: true, data: res.data });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const fetchAllCourses = () => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/courses`)
      .then((res) => {
        resolve({ status: true, data: res.data });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const resetForgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/users/forgot-password-otp`, { email })
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const updatePassword = (data) => {
  return new Promise((resolve) => {
    axios
      .put(`${API_URL}/users/update-password`, { ...data })
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const fetchInstructorCourses = (id) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/courses/${id}/instructor`)
      .then((res) => {
        resolve({ status: true, data: res.data });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const getCourseDetails = (courseId) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/courses/${courseId}`)
      .then((res) => {
        resolve({ status: true, data: res.data });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const addCourse = (data) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}/courses`, data)
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const deleteUserCourse = (data) => {
  return new Promise((resolve) => {
    axios
      .delete(`${API_URL}/courses/${data}`)
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const updateUserBookmark = (data) => {
  return new Promise((resolve) => {
    axios
      .put(
        `${API_URL}/courses/${data.courseId}/bookmark/${userInfo._id}?isFav=${data.bookmark}`
      )
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const enrollCourse = (courseId, isEnroll) => {
  return new Promise((resolve) => {
    axios
      .put(
        `${API_URL}/courses/${courseId}/enrollment/${userInfo._id}?isEnrolled=${isEnroll}`
      )
      .then((res) => {
        resolve({ status: true });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const sendMessage = (courseId, message) => {
  return new Promise((resolve) => {
    axios
      .put(`${API_URL}/courses/${courseId}/faq`, {
        data: { text: message, userId: userInfo._id },
      })
      .then((res) => {
        resolve({ status: true });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const addStudentByAdmin = (data) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}/users/student/admin`, data)
      .then((res) => resolve({ status: true, data: res.data }))
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};

export const uploadFile = ({ courseId, isFile, file }) => {
  return new Promise((resolve) => {
    axios
      .put(
        `${API_URL}/courses/${courseId}/thumbnailOrFile?file=${isFile}`,
        file
      )
      .then((res) => {
        resolve({ status: true, data: res.data });
      })
      .catch((err) => {
        resolve({
          status: false,
          data: err.response.data?.message || err.message,
        });
      });
  });
};
