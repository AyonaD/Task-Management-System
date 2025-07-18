import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8005", // Change to your Laravel API URL
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json", // * Important so we don't get HTML responses
    "Content-Type": "application/json",
    "Cache-Control": "no-cache", // "Do not use cached content without validating with the server"
  }
});

export default api;
