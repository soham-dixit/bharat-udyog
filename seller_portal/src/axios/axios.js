import axios from "axios";

const url = axios.create({
  // baseURL: "https://dak-ghar-niryat-kendra.vercel.app/api/v4",
  baseURL: "http://localhost:8000/api/v4",
  // baseURL: "https://bharatudyog.vercel.app/api/v4",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default url;
