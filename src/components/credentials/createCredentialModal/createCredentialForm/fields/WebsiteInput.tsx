import { useState, useEffect } from "react";
import { Input } from "@heroui/input";

import { useCredentialFormStore } from "@/stores";

export default function WebsiteInput() {
  const { credentialFormData, setCredentialFormData } = useCredentialFormStore();
  const [localWebsite, setLocalWebsite] = useState(
    credentialFormData.website || "",
  );
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setLocalWebsite(credentialFormData.website || "");
  }, [credentialFormData.website]);

  const validateUrl = (url: string) => {
    return /^(https?:\/\/)?([\w\-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(url);
  };

  const onInputChange = (e: string) => {
    setLocalWebsite(e);
    setIsValid(validateUrl(e));

    if (validateUrl(e)) {
      setCredentialFormData({
        ...credentialFormData,
        website: e,
      });
    }
  };

  return (
    <Input
      isClearable
      className="w-full"
      color="primary"
      errorMessage={
        !isValid ? "Invalid URL. Must start with http:// or https://" : ""
      }
      label="Website"
      placeholder="Enter the website (e.g. https://example.com)"
      type="url"
      value={localWebsite}
      variant="bordered"
      onValueChange={onInputChange}
    />
  );
}
