import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true,
});

const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;


export default api;
