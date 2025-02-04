import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
} from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useCredentialsStore } from "@/stores/credentialsStore.ts";
import { decryptData, encryptData } from "@/utils/encrypt.ts";
import { deleteCredential, updateCredential } from "@/services/credentials.ts";

interface CredentialModalProps {
  isOpen: boolean;
  fetchCredentials: () => void;
}

export default function CredentialModal({
  isOpen,
  fetchCredentials,
}: CredentialModalProps) {
  const { credentialDetail, toggleModalOpen } = useCredentialsStore();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await updateCredential(credentialDetail.id, {
        username: formData.username,
        password: encryptData(String(formData.password)),
        website: formData.website,
        notes: formData.notes,
      });

      toast.success("Credential updated successfully!");
      fetchCredentials();
      closeModal();
    } catch (error) {
      console.error("Error updating credential:", error);
      toast.error("Failed to update credential. Please try again.");
    }
  };

  const closeModal = () => {
    toggleModalOpen();
    setIsVisible(false);
  };

  const onDelete = async () => {
    if (!credentialDetail) return;

    try {
      await deleteCredential(credentialDetail.id);
      toast.success("Credential deleted successfully!");
      fetchCredentials();
      closeModal();
    } catch (error) {
      toast.error("Failed to delete credential. Please try again.");
      console.error("Error deleting credential:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {credentialDetail ? (
        <ModalContent>
          {(_) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-5">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={credentialDetail.category_data?.icon}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h3 className="text-2xl text-default-600">
                      {credentialDetail.category_data?.name}
                    </h3>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                  <Input
                    isRequired
                    defaultValue={credentialDetail?.username || ""}
                    errorMessage="This field is required"
                    label="Username"
                    name="username"
                    placeholder="Enter username"
                  />
                  <Input
                    isRequired
                    className="w-full"
                    color="primary"
                    defaultValue={decryptData(credentialDetail?.password) || ""}
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
                    errorMessage="This field is required"
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                  />
                  <Input
                    isRequired
                    defaultValue={credentialDetail?.website || ""}
                    errorMessage="This field is required"
                    label="Website"
                    name="website"
                    placeholder="Enter website URL"
                    type="url"
                  />
                  <Input
                    isRequired
                    defaultValue={credentialDetail?.notes || ""}
                    errorMessage="This field is required"
                    label="Notes"
                    name="notes"
                    placeholder="Enter notes"
                  />
                  <div className="flex justify-between w-full gap-4">
                    <Button
                      className="flex-1"
                      color="danger"
                      variant="bordered"
                      onPress={onDelete}
                    >
                      <Icon
                        className="mr-2"
                        icon="solar:trash-bin-trash-bold-duotone"
                        width={18}
                      />
                      Delete
                    </Button>
                    <Button className="flex-1" color="primary" type="submit">
                      <Icon
                        className="mr-2"
                        icon="solar:save-bold-duotone"
                        width={18}
                      />
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="danger"
                  variant="light"
                  onPress={closeModal}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      ) : (
        <p>No credential selected.</p>
      )}
    </Modal>
  );
}
