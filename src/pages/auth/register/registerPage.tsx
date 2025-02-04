import { Button, Divider, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AnimatedPage from "@/components/AnimatedPage.tsx";
import { title } from "@/components/primitives.ts";
import { createAccount } from "@/services/accounts.ts";
import { useAuthStore } from "@/stores";

interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  isDisabled: boolean;
  passwordError: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean | null>(null);
  const { setLoginFormData } = useAuthStore();
  const [formState, setFormState] = useState<RegisterState>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    isDisabled: true,
    passwordError: "",
  });

  const validateForm = (state: RegisterState) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
    const isPasswordValid = state.password.length > 0;
    const isPasswordMatch = state.password === state.confirmPassword;
    const isNameValid = state.firstName.length > 0 && state.lastName.length > 0;

    return !(isEmailValid && isPasswordValid && isPasswordMatch && isNameValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedState = { ...formState, [name]: value };

    updatedState.passwordError =
      updatedState.password &&
      updatedState.confirmPassword &&
      updatedState.password !== updatedState.confirmPassword
        ? "Passwords do not match"
        : "";

    updatedState.isDisabled = validateForm(updatedState);
    setFormState(updatedState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        await createAccount({
          email: formState.email,
          password: formState.password,
          first_name: formState.firstName,
          last_name: formState.lastName,
        });

        toast.success("Account successfully created!");

        setLoginFormData({
          email: formState.email,
          password: formState.password,
        });

        setTimeout(() => navigate("/login"), 500);
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.data) {
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${messages}`)
            .join("\n");

          toast.error(errorMessages);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="flex h-full w-full flex-col items-center justify-center mt-12 bg-background">
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <h2
            className={
              "font-bold text-inherit" + title({ color: "cyan", size: "sm" })
            }
          >
            Register
          </h2>

          <Form validationBehavior="native" onSubmit={onSubmit}>
            <Input
              isRequired
              errorMessage="Invalid email"
              isDisabled={loading === true}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              isDisabled={loading === true}
              label="First Name"
              labelPlacement="outside"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
              value={formState.firstName}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              isDisabled={loading === true}
              label="Last Name"
              labelPlacement="outside"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
              value={formState.lastName}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              errorMessage="Password is required"
              isDisabled={loading === true}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formState.password}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              errorMessage={formState.passwordError}
              isDisabled={loading === true}
              isInvalid={formState.passwordError.length > 0}
              label="Confirm Password"
              labelPlacement="outside"
              name="confirmPassword"
              placeholder="Re-enter your password"
              type="password"
              value={formState.confirmPassword}
              onChange={handleInputChange}
            />

            <Button
              className="w-full mt-2"
              color="primary"
              isDisabled={formState.isDisabled || loading === true}
              isLoading={loading === true}
              size="lg"
              type="submit"
              variant="solid"
            >
              {loading ? "" : "Sign Up"}
            </Button>
          </Form>
          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>
          <div className="flex justify-center">
            <Link className="text-center" href="/login" underline="always">
              Go back to login
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
