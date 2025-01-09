// axiosInstance.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
// 'http://localhost:8080/api/v1'
const axiosInstance = axios.create({
  baseURL: baseURL,  // Your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Include credentials with requests
});

export default axiosInstance;
