import { Button } from "@heroui/button";
import { Form } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";

import { useAuthStore } from "@/stores";
import AnimatedPage from "@/components/AnimatedPage.tsx";
import { changePassword } from "@/services/accounts.ts";
import { Link } from "@heroui/link";

export default function SetNewPasswordPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { resetPasswordFormData, setResetPasswordFormData } = useAuthStore();
  const [loading, setLoading] = useState<boolean | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setTimeout(async () => {
      try {
        setResetPasswordFormData(data);
        await changePassword(resetPasswordFormData);
        setResetPasswordFormData({});
        toast.success("You have changed your password");
        navigate("/login");
      } catch (error) {
        toast.error("Sorry couldn't change your password");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="flex h-full w-full flex-col items-center justify-center mt-12 bg-background">
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <h2 className="font-semibold text-2xl">Change password</h2>
          <Form
            className="flex w-full flex-col items-start gap-4"
            validationBehavior="native"
            onSubmit={onSubmit}
          >
            <Input
              className="max-w-xs"
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Icon
                      className="text-foreground-400"
                      height={24}
                      icon="solar:eye-bold"
                      width={24}
                    />
                  ) : (
                    <Icon
                      className="text-foreground-400"
                      height={24}
                      icon="solar:eye-closed-bold"
                      width={24}
                    />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Button
              className="w-full mt-2"
              color="primary"
              isDisabled={loading === true}
              isLoading={loading === true}
              size="lg"
              type="submit"
              variant="solid"
            >
              Change password
            </Button>
          </Form>

          <div className="flex justify-end">
            <Link
              showAnchorIcon
              className="text-left"
              href="/login"
              underline="always"
            >
              Go back to login
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
