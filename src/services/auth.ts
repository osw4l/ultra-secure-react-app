import axios from "axios";

import { LoginFormData } from "@/stores/authStore.ts";

export const Login = async (data: LoginFormData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/auth/token/`,
      data,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RefreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/auth/refresh/`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.access;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};
