import axios from "axios";

// const baseUrl = process.env.BASE_URL;
const baseUrl = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, id, data) => axiosInstance.put(`${url}/${id}`, data),
  delete: (url, id) => axiosInstance.delete(`${url}/${id}`),
};
