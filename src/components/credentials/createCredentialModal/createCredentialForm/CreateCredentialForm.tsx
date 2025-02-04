import { Progress } from "@heroui/progress";
import { Divider } from "@heroui/react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";

import CategoryAutocomplete from "@/components/credentials/createCredentialModal/createCredentialForm/fields/CategoryAutocomplete.tsx";
import UsernameInput from "@/components/credentials/createCredentialModal/createCredentialForm/fields/UsernameInput.tsx";
import PasswordInput from "@/components/credentials/createCredentialModal/createCredentialForm/fields/PasswordInput.tsx";
import WebsiteInput from "@/components/credentials/createCredentialModal/createCredentialForm/fields/WebsiteInput.tsx";
import NotesInput from "@/components/credentials/createCredentialModal/createCredentialForm/fields/NotesInput.tsx";
import { useCategoriesStore, useCredentialFormStore } from "@/stores";
import CreateCustomCategoryModal from "@/components/credentials/CreateCustomCategoryModal.tsx";
import ReviewCreateCredentials from "@/components/credentials/createCredentialModal/createCredentialForm/ReviewCreateCredentials.tsx";

export default function CreateCredentialForm() {
  const { currentFormStep } = useCredentialFormStore();
  const { categories, toggleModalOpen } = useCategoriesStore();
  const [isModalCategoriesOpen, setModalCategoriesOpen] = useState(false);

  const customCategories = categories.filter((category) => category.custom);

  return (
    <>
      <CreateCustomCategoryModal
        isOpen={isModalCategoriesOpen}
        onClose={() => setModalCategoriesOpen(false)}
      />
      {/* Progress Bar */}
      {currentFormStep < 4 && (
        <Progress
          aria-label="Progress"
          className="mb-4"
          showValueLabel={true}
          value={currentFormStep * 33.3333}
        />
      )}
      {/* Step 1: Category */}
      {currentFormStep === 0 && (
        <div>
          <CategoryAutocomplete />

          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>

          <div className="flex items-center gap-4 py-2">
            {customCategories.length === 0 ? (
              // Show only the "Create" button full width
              <Button
                className="w-full bg-emerald-400 border-emerald-400 text-foreground-100"
                endContent={
                  <Icon height={24} icon="solar:widget-add-bold-duotone" width={24} />
                }
                size="lg"
                onPress={() => {
                  setModalCategoriesOpen(true);
                }}
              >
                Create
              </Button>
            ) : (
              // Show both "Manage" and "Create" buttons with half width
              <div className="flex gap-2 w-full">
                <Button
                  className="w-1/2"
                  color="secondary"
                  endContent={
                    <Icon
                      className="animate-spin"
                      height={24}
                      icon="solar:settings-bold-duotone"
                      width={24}
                    />
                  }
                  size="lg"
                  variant="ghost"
                  onPress={toggleModalOpen}
                >
                  Manage
                </Button>
                <Button
                  className="w-1/2 bg-emerald-400 border-emerald-400 text-foreground-100"
                  endContent={
                    <Icon height={24} icon="solar:widget-add-bold-duotone" width={24} />
                  }
                  size="lg"
                  onPress={() => {
                    setModalCategoriesOpen(true);
                  }}
                >
                  Create
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Username & Password */}
      {currentFormStep === 1 && (
        <div>
          <UsernameInput />
          <PasswordInput />
        </div>
      )}

      {/* Step 3: Website */}
      {currentFormStep === 2 && (
        <div>
          <WebsiteInput />
        </div>
      )}

      {/* Step 4: Notes */}
      {currentFormStep === 3 && (
        <div>
          <NotesInput />
        </div>
      )}

      {/* Step 4: Review */}
      {currentFormStep === 4 && (
        <div>
          <ReviewCreateCredentials />
        </div>
      )}
    </>
  );
}
