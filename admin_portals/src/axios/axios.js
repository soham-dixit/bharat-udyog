import axios from "axios";

const url = axios.create({
  // baseURL: "http://localhost:8000/api/v4",
  baseURL: "http://192.168.76.76:9000/api/v4",
  // baseURL: "https://bharat-udyog.vercel.app/api/v4",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default url;
