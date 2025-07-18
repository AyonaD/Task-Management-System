import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8005", // Change to your Laravel API URL
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

export default api;
