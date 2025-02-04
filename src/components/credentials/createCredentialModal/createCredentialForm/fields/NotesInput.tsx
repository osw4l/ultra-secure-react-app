import { Textarea } from "@heroui/input";

import { useCredentialFormStore } from "@/stores";

export default function NotesInput() {
  const { credentialFormData, setCredentialFormData } =
    useCredentialFormStore();

  const onInputChange = (e: string) => {
    setCredentialFormData({
      ...credentialFormData,
      notes: e,
    });
  };

  return (
    <Textarea
      isClearable
      className="w-full border-color-cyan-400"
      color="primary"
      label="Notes"
      placeholder="Your notes here"
      value={credentialFormData?.notes}
      variant="bordered"
      onValueChange={onInputChange}
    />
  );
}
