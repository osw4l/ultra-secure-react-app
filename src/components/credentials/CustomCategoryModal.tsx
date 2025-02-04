import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Avatar } from "@heroui/avatar";
import { ModalFooter } from "@heroui/modal";
import { toast } from "react-hot-toast";

import CellWrapper from "@/components/shared/CellWrapper.tsx";
import { useCategoriesStore } from "@/stores";
import { deleteUserCategory } from "@/services/credentials.ts";

export default function CustomCategoryModal() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const { isModalOpen, categories, setCategories, toggleModalOpen } =
    useCategoriesStore();
  const customCategories = categories.filter((category) => category.custom);

  const deleteCategory = (id: number, uuid: string) => {
    setLoading(true);
    setSelected(id);
    setTimeout(async () => {
      try {
        await deleteUserCategory(id);
        const newListOfCategories = categories.filter((c) => c.uuid !== uuid);

        setCategories(newListOfCategories);
        setSelected(null);
        toast.success("Category deleted successfully");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <Modal isOpen={isModalOpen}>
      <ModalContent>
        {(_) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Manage Custom Categories
            </ModalHeader>
            <ModalBody>
              {customCategories.length > 0 ? (
                <ul>
                  {customCategories.map((category) => (
                    <CellWrapper
                      key={category.id}
                      className="mb-2 hover:bg-foreground-200"
                    >
                      <div className="flex items-center justify-between">
                        <Avatar
                          alt={category.name}
                          className="w-10 h-10 object-cover"
                          src={category.icon}
                        />
                        <h3 className="ml-2 text-2xl">{category.name}</h3>
                      </div>
                      <Button
                        color="danger"
                        disabled={loading}
                        isLoading={selected === category.id}
                        radius="full"
                        variant="flat"
                        onPress={() => {
                          deleteCategory(category.id, category.uuid);
                        }}
                      >
                        {selected === category.id ? "" : "Delete"}{" "}
                      </Button>
                    </CellWrapper>
                  ))}
                </ul>
              ) : (
                <p>No custom categories found.</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                color="secondary"
                isDisabled={loading}
                radius="sm"
                variant="faded"
                onPress={toggleModalOpen}
              >
                Go Back
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
