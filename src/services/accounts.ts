import axios from "axios";

import http from "@/utils/http.ts";
import { LoginFormData, ResetPasswordData } from "@/stores/authStore.ts";
import { RegisterData } from "@/pages/auth/register/registerPage.tsx";

export const getUser = async () => {
  try {
    const response = await http.get("/accounts/user/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetCode = async ({ email }: LoginFormData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/accounts/recovery/send_reset_code/`,
      { email },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateResetCode = async ({ email, code }: ResetPasswordData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/accounts/recovery/validate_reset_code/`,
      { email, code },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async ({
  email,
  code,
  password,
}: ResetPasswordData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/accounts/recovery/change_password/`,
      { email, code, password },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (data: RegisterData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/accounts/create/`,
      data,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
