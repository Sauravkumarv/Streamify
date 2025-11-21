import axios from "axios"
 const BASE_URL=import.meta.env.VITE_API_KEY;

export const axiosInstance=axios.create({
  baseURL:BASE_URL,
  withCredentials: true,
})