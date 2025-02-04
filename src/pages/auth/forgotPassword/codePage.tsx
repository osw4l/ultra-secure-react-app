import { Button } from "@heroui/button";
import { Form, InputOtp } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Alert } from "@heroui/alert";

import { useAuthStore } from "@/stores";
import AnimatedPage from "@/components/AnimatedPage.tsx";
import { validateResetCode } from "@/services/accounts.ts";
import { Link } from "@heroui/link";

export default function CodePage() {
  const navigate = useNavigate();
  const { resetPasswordFormData, setResetPasswordFormData } = useAuthStore();
  const [loading, setLoading] = useState<boolean | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setTimeout(async () => {
      try {
        setResetPasswordFormData(data);
        await validateResetCode(resetPasswordFormData);
        toast.success("Your code is valid!");
        navigate("/change-password");
      } catch (error) {
        toast.error("Invalid code");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="flex h-full w-full flex-col items-center justify-center mt-12 bg-background">
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <h2 className="font-semibold text-2xl text-center">Check code</h2>
          <div className="flex items-center justify-center w-full text-center">
            <Alert
              hideIcon
              color="warning"
              title="The code might be on spam"
              variant="faded"
            />
          </div>
          <Form
            className="flex w-full flex-col items-start gap-4 items-center"
            validationBehavior="native"
            onSubmit={onSubmit}
          >
            <InputOtp
              isRequired
              aria-label="Validate your code"
              length={4}
              name="code"
              placeholder="Enter code"
              size="lg"
              validationBehavior="native"
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
              Check Code
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
