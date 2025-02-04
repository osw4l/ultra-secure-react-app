import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores";
import AnimatedPage from "@/components/AnimatedPage.tsx";
import { sendResetCode } from "@/services/accounts.ts";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { setResetPasswordFormData } = useAuthStore();
  const [loading, setLoading] = useState<boolean | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setTimeout(async () => {
      try {
        await sendResetCode(data);
        setResetPasswordFormData(data);
        toast.success("Email sent, please check your inbox!");
        navigate("/check-code");
      } catch (error) {
        toast.error("We couldn't send the code");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="flex h-full w-full flex-col items-center justify-center mt-12 bg-background">
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <h2 className="font-semibold text-2xl">Reset your password</h2>
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
              {loading ? "" : "Send Email"}
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
