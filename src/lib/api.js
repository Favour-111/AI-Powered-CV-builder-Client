import axios from "axios";
import { getAuthHeaders } from "./session";

export const apiBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

export function withAuth(config = {}) {
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      ...getAuthHeaders(),
    },
  };
}
