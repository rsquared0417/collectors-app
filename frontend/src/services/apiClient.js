import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attaches the token to every request if one exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
