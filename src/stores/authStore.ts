import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailPasswordData {
  email?: string;
  password?: string;
}

export interface LoginFormData extends EmailPasswordData {}

export interface OtpLoginFormData {
  code?: string;
  email?: string;
}

export interface ResetPasswordData extends EmailPasswordData {
  code?: string;
  password2?: string;
}

interface AuthState {
  loginFormData: LoginFormData;
  resetPasswordFormData: ResetPasswordData;
  token: string;
  refresh: string;
  loading: boolean;
  errors: any[];
  success: boolean;
  setLoginFormData: (data: LoginFormData) => void;
  setResetPasswordFormData: (data: ResetPasswordData) => void;
  setRefresh: (refresh: string) => void;
  setToken: (token: string) => void;
  startRequest: () => void;
  endRequest: () => void;
  setErrors: (errors: any[]) => void;
  setSuccess: (success: boolean) => void;
  logout: () => void;
  clearPasswordFormData: () => void;
  clearOpt: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      otpLoginFormData: {},
      loginFormData: {
        email: "",
        password: "",
      },
      resetPasswordFormData: {},
      token: "",
      refresh: "",
      loading: false,
      errors: [],
      success: false,
      setLoginFormData: (data: LoginFormData) => {
        set((state) => ({
          loginFormData: {
            ...state.loginFormData,
            ...data,
          },
        }));
      },
      setResetPasswordFormData: (data: ResetPasswordData) => {
        set((state) => ({
          resetPasswordFormData: {
            ...state.resetPasswordFormData,
            ...data,
          },
        }));
      },
      setRefresh: (refresh: string) => set({ refresh }),
      setToken: (token: string) => set({ token }),
      startRequest: () => set({ loading: true }),
      endRequest: () => set({ loading: false }),
      setErrors: (errors: any[]) => set({ errors }),
      setSuccess: (success: boolean) => set({ success }),
      logout: () => set({ token: "", refresh: "" }),
      clearPasswordFormData: () => set({ resetPasswordFormData: {} }),
      clearOpt: () =>
        set({
          resetPasswordFormData: {},
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        loginFormData: { email: state.loginFormData.email },
        refresh: state.refresh,
      }),
    },
  ),
);
