import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('@Auth:token') ?? "");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.auth}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.href = "/sign-in/?session=inactive"
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
