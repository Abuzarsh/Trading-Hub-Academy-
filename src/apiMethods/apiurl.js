import axios from "axios";

const apiUrl = axios.create({
  baseURL: "http://localhost:5000", // Replace with your actual API URL
  // baseURL: "https://thetradinghubacademy.com/",
  withCredentials: true, // Include credentials in requests
});

export default apiUrl;
