import { Input } from "@heroui/input";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { useCredentialFormStore } from "@/stores";

export default function PasswordInput() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { credentialFormData, setCredentialFormData } =
    useCredentialFormStore();

  const onInputChange = (e: string) => {
    setCredentialFormData({
      ...credentialFormData,
      password: e,
    });
  };

  return (
    <Input
      className="w-full"
      color="primary"
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
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      value={credentialFormData?.password}
      variant="bordered"
      onValueChange={onInputChange}
    />
  );
}
