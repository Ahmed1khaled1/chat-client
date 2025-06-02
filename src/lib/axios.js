import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://chat-backend-beta-ten.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;