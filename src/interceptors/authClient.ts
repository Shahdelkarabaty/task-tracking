import axios from "axios";
import appRouter from "../router";
import { useAuthStore } from "@/stores/authStore";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
});

httpClient.interceptors.request.use(
  (config) => {
    const authorizationStore = useAuthStore();
    const authToken = authorizationStore.user?.token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore().setUserState(null);
      appRouter.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default httpClient;
