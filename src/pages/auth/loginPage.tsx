import { Button, Form, Input, Link } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AnimatedPage from "@/components/AnimatedPage.tsx";
import { useAuthStore } from "@/stores/authStore";
import { getUser, Login } from "@/services";
import { title } from "@/components/primitives.ts";
import { getCategories } from "@/services/credentials.ts";
import { Category, useCategoriesStore } from "@/stores/categoriesStore.ts";
import { useUserStore } from "@/stores";

interface LoginState {
  email: string;
  password: string;
  isDisabled: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setRefresh, setLoginFormData, loginFormData } =
    useAuthStore();
  const { setCategories } = useCategoriesStore();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [formState, setFormState] = useState<LoginState>({
    email: "",
    password: "",
    isDisabled: true,
  });

  useEffect(() => {
    if (loginFormData.email) {
      setFormState({
        email: loginFormData.email,
        password: loginFormData.password || "",
        isDisabled: false,
      });
    }
  }, [loginFormData.email]);

  const validateForm = (email: string, password: string) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+$/.test(email);

    return !(isEmailValid && password.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedState = { ...formState, [name]: value };

    updatedState.isDisabled = validateForm(
      updatedState.email,
      updatedState.password,
    );
    setFormState(updatedState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        const data = await Login({
          email: formState.email,
          password: formState.password,
        });

        setLoginFormData({ email: data.email });
        setToken(data.access);
        setRefresh(data.refresh);
        toast.success("Welcome!");
        navigate("/");

        const user = await getUser();
        setUser(user);

        const currentCategories = await getCategories();

        const userCategories = user.categories.map((category: Category) => ({
          ...category,
          custom: true,
        }));

        const defaultCategories = currentCategories.map(
          (category: Category) => ({
            ...category,
            custom: false,
          }),
        );

        const categories = [...userCategories, ...defaultCategories];

        setCategories(categories);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Incorrect login credentials");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="flex h-full w-full flex-col items-center justify-center mt-12 bg-background">
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <h2 className="font-semibold text-2xl">Welcome to</h2>
          <h2
            className={
              "font-bold text-inherit" + title({ color: "cyan", size: "md" })
            }
          >
            Ultra Secure
          </h2>

          <Form validationBehavior="native" onSubmit={onSubmit}>
            <Input
              isRequired
              errorMessage="Invalid email"
              isDisabled={loading === true}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email address"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              errorMessage="Invalid password"
              isDisabled={loading === true}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formState.password}
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
              {loading ? "" : "Sign in"}
            </Button>
          </Form>

          <Button
            className="w-full"
            color="primary"
            isDisabled={loading === true}
            size="lg"
            type="submit"
            variant="ghost"
            onPress={() => navigate("/register")}
          >
            Create an account
          </Button>

          <div className="flex justify-end">
            <Link
              showAnchorIcon
              className="text-left"
              href="/reset-password"
              underline="always"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
