import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
} from "@heroui/react";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

import { createUserCategory } from "@/services/credentials.ts";
import { useCategoriesStore, useCredentialFormStore } from "@/stores";

interface FormState {
  name: string;
  icon: File | null;
  isValid: boolean;
}

export default function CreateCustomCategoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { credentialFormData, setCredentialFormData } =
    useCredentialFormStore();
  const { categories, setCategories } = useCategoriesStore();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    icon: null,
    isValid: false,
  });

  const validateForm = (state: FormState) => {
    return state.name.trim().length > 0 && state.icon !== null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const updatedState = { ...formState, [name]: files ? files[0] : value };

    updatedState.isValid = validateForm(updatedState);
    setFormState(updatedState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formState.isValid) {
      setLoading(false);

      return;
    }

    try {
      const data = await createUserCategory(
        formState.name,
        formState.icon as File,
      );

      data.custom = true;

      setCategories([data, ...categories]);

      setTimeout(() => {
        setCredentialFormData({
          ...credentialFormData,
          category: {
            selectedCategoryKey: data.uuid,
            ...data,
          },
        });
      }, 500);

      setFormState({
        name: "",
        icon: null,
        isValid: false,
      });

      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create custom category
            </ModalHeader>
            <ModalBody>
              <Form
                className="w-full"
                validationBehavior="native"
                onSubmit={onSubmit}
              >
                <Input
                  isRequired
                  errorMessage="The name is required"
                  label="Category Name"
                  labelPlacement="outside"
                  name="name"
                  placeholder="Enter the category name"
                  size="lg"
                  type="text"
                  value={formState.name}
                  onChange={handleInputChange}
                />

                <Input
                  isRequired
                  accept="image/png, image/jpeg, image/jpg"
                  className="pt-5 pb-2"
                  errorMessage="The file is required"
                  label="Icon"
                  labelPlacement="outside"
                  multiple={false}
                  name="icon"
                  placeholder="Attach Icon"
                  size="lg"
                  type="file"
                  onChange={handleInputChange}
                />

                <div className="flex flex-row w-full gap-1 mt-3">
                  <Button
                    className="w-1/2"
                    color="danger"
                    isDisabled={loading}
                    size="lg"
                    variant="light"
                    onPress={onCloseModal}
                  >
                    Close
                  </Button>

                  <Button
                    className="w-1/2"
                    color="primary"
                    endContent={
                      <Icon
                        className={
                          loading || !formState.isValid ? "opacity-50" : ""
                        }
                        height={24}
                        icon="solar:file-send-bold-duotone"
                        width={24}
                      />
                    }
                    isDisabled={loading || !formState.isValid}
                    isLoading={loading}
                    size="lg"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
