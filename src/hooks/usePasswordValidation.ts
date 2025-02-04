import { useMemo } from "react";

import { ResetPasswordData } from "@/stores/authStore";

export const usePasswordValidation = (
  resetPasswordFormData: ResetPasswordData,
) => {
  const { password = "", password2 = "" } = resetPasswordFormData;

  // Validation logic for password and confirmation
  const isInvalid = useMemo(() => {
    if (!password || !password2) {
      return false; // No validation if fields are empty
    }

    return password.length < 6 || password !== password2;
  }, [password, password2]);

  const isValidPassword = useMemo(() => {
    return password.length >= 6 && password === password2;
  }, [password, password2]);

  const isDisabled = useMemo(() => {
    return (
      !password ||
      !password2 ||
      password.length < 6 ||
      password2.length < 6 ||
      password !== password2
    );
  }, [password, password2]);

  return { isInvalid, isValidPassword, isDisabled };
};
