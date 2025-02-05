// axiosInstance.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
// 'http://localhost:8080/api/v1'
const axiosInstance = axios.create({
  // baseURL: "https://spendr-expense-tracker.vercel.app/api/v1",
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Include credentials with requests
});

export default axiosInstance;
