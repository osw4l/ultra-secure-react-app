import { Button } from "@heroui/button";

import { useCredentialFormStore } from "@/stores";

export default function StepFormButtons() {
  const { nextStep, prevStep, currentFormStep } = useCredentialFormStore();

  return (
    <>
      {currentFormStep > 0 && (
        <Button
          className="w-1/2"
          color="warning"
          size="lg"
          variant="flat"
          onPress={prevStep}
        >
          Back
        </Button>
      )}
      <Button
        className={currentFormStep === 0 ? "w-full" : "w-1/2"}
        color="primary"
        size="lg"
        onPress={nextStep}
      >
        Next
      </Button>
    </>
  );
}
