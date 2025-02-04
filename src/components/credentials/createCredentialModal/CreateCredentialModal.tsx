import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { useCredentialFormStore } from "@/stores";
import SavePasswordButton from "@/components/credentials/createCredentialModal/createCredentialForm/SavePasswordButton.tsx";
import StepFormButtons from "@/components/credentials/createCredentialModal/createCredentialForm/StepFormButtons.tsx";
import CreateCredentialForm from "@/components/credentials/createCredentialModal/createCredentialForm/CreateCredentialForm.tsx";

export default function CreateCredentialModal({
  fetchCredentials,
}: {
  fetchCredentials: () => void;
}) {
  const { isModalOpen, toggleModalOpen, saving, currentFormStep, resetStep } = useCredentialFormStore();

  const handleClose = () => {
    toggleModalOpen();
    resetStep();
  };

  const stepTitles = [
    "Step 1 / 4: Select Category",
    "Step 2 / 4: Enter Username and password",
    "Step 3 / 4: Add Website",
    "Step 4 / 4: Add Notes",
    "Review & Save Password",
    "Password Created Successfully!",
  ];

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={saving}
      isDismissable={false}
      isOpen={isModalOpen}
      placement="auto"
      onClose={handleClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {stepTitles[currentFormStep] || "Create new password"}
            </ModalHeader>

            <ModalBody>
              {currentFormStep === 6 ? (
                <p className="text-center text-green-600 font-semibold">
                  Your password has been successfully created! 🎉
                </p>
              ) : (
                <CreateCredentialForm />
              )}
            </ModalBody>

            <ModalFooter>
              {currentFormStep >= 0 && currentFormStep < 4 && (
                <StepFormButtons />
              )}
              {currentFormStep === 4 && <SavePasswordButton fetchCredentials={fetchCredentials} />}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
