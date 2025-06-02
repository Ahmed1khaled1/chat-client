import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://chat-backend-i7i5.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;