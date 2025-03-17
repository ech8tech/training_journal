import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9001/api",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
