import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.69:1111/api",
  // baseURL: "https://www.habitune.net/api",
});

export default axiosInstance;
