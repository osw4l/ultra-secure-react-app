import { Button } from "@heroui/button";
import { toast } from "react-hot-toast";

import { useCredentialFormStore } from "@/stores";
import { createCredentials } from "@/services/credentials.ts";
import { encryptData } from "@/utils/encrypt.ts";

export default function SavePasswordButton({
  fetchCredentials,
}: {
  fetchCredentials: () => void;
}) {
  const {
    saving,
    startSaving,
    stopSaving,
    credentialFormData,
    prevStep,
    setCredentialFormData,
    toggleModalOpen,
    resetStep,
  } = useCredentialFormStore();

  const savePassword = () => {
    startSaving();

    setTimeout(async () => {
      const { category } = credentialFormData;

      const payload = {
        username: credentialFormData.username
          ? credentialFormData.username
          : null,
        password: credentialFormData.password
          ? encryptData(credentialFormData.password)
          : null,
        website: credentialFormData.website,
        notes: credentialFormData.notes ? credentialFormData.notes : null,
        ...(category?.custom
          ? { user_category: category?.id }
          : { category: category?.id }),
      };

      try {
        await createCredentials(payload);
        toast.success("New credential created!");
        setCredentialFormData({
          category: {
            id: 0,
            uuid: "",
            name: "",
            icon: "",
            selectedCategoryKey: "",
          },
          username: "",
          password: "",
          website: "",
          notes: "",
        });

        toggleModalOpen();
        resetStep();

        fetchCredentials();
      } catch (_) {
        toast.error("We could not create new credentials.");
      }

      stopSaving();
    }, 1000);
  };

  const formIsValid =
    !!credentialFormData &&
    !!credentialFormData.username?.trim() &&
    !!credentialFormData.password &&
    !!credentialFormData.website &&
    !!credentialFormData.category?.uuid &&
    !!credentialFormData.notes?.trim();

  return (
    <div className="w-full flex justify-center items-center gap-2">
      <Button
        className="w-1/3"
        color="warning"
        isDisabled={saving}
        variant="flat"
        onPress={prevStep}
      >
        Back
      </Button>

      <Button
        className="w-full bg-cyan-400 text-white"
        isDisabled={saving || !formIsValid}
        isLoading={saving}
        onPress={savePassword}
      >
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
