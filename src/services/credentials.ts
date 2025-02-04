import axios from "axios";

import http from "@/utils/http.ts";
import { LoginFormData } from "@/stores/authStore.ts";

export const getCategories = async () => {
  try {
    const response = await http.get("/credentials/categories/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserCategory = async (name: string, file: File) => {
  try {
    const payload = new FormData();

    payload.append("name", name);
    payload.append("icon", file);

    const response = await http.post("/credentials/user_categories/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserCategory = async (credentialId: number) => {
  try {
    const response = await http.delete(
      `/credentials/user_categories/${credentialId}/`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetCode = async ({ email }: LoginFormData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/accounts/send_reset_code/`,
      { email },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCredentials = async (payload: any) => {
  try {
    const response = await http.post("/credentials/credentials/", payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCredentials = async (queryParams = {}) => {
  try {
    // @ts-ignore
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => (value != null && value != "")),
    );

    // @ts-ignore
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = `/credentials/credentials/${queryString ? `?${queryString}` : ""}`;

    const response = await http.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCredential = async (credentialId: number) => {
  try {
    const response = await http.delete(
      `/credentials/credentials/${credentialId}/`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCredential = async (
  credentialId: number,
  payload: {
    username: File | string;
    password: string;
    website: File | string;
    notes: File | string;
  },
) => {
  try {
    const response = await http.patch(
      `/credentials/credentials/${credentialId}/`,
      payload,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
