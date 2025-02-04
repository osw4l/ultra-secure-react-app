import { Input } from "@heroui/input";

import { useCredentialFormStore } from "@/stores";

export default function UsernameInput() {
  const { credentialFormData, setCredentialFormData } =
    useCredentialFormStore();

  const onInputChange = (e: string) => {
    setCredentialFormData({
      ...credentialFormData,
      username: e,
    });
  };

  return (
    <Input
      isClearable
      className="w-full mb-2"
      color="primary"
      label="Username"
      placeholder="Enter your username"
      type="text"
      value={credentialFormData?.username}
      variant="bordered"
      onValueChange={onInputChange}
    />
  );
}
