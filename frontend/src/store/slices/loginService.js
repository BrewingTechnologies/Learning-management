import axios from 'axios'

import config from '../../config/index';


const API_URL = config.RestServiceURL;

// Register user
export const register = async (userData) => {
  const response = await axios.post(API_URL + 'users/user', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
// export const login = async (userData) => {
//   const response = await axios.post(API_URL + 'users/login', userData)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

//   return response.data
// }


// verify otp
export const verifyOtp = async ({ otp, userId }) => {
  const response = await axios.put(API_URL + 'users/' + userId + '/verify-otp', { OTP: otp })

  return response.data
}