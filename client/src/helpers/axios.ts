import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

const baseURL = isDev
  ? "http://192.168.1.69:1111/api"
  : "https://habitune-berkpeker2707.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
