import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
//? "http://192.168.1.34:1111/api"

const baseURL = isDev
  ? "https://habitune-test.vercel.app/api"
  : "https://habitune-test.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
