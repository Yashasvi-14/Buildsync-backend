import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend URL is different
  withCredentials: true,
});

export default axiosInstance;
