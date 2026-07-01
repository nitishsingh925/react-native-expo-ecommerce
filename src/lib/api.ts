import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function proxiedImageUrl(originalUrl: string): string {
  if (!originalUrl) return originalUrl;
  return originalUrl.replace(
    "https://fakestoreapi.com/img/",
    "https://fakestoreapi.com/img/",
  );
}
