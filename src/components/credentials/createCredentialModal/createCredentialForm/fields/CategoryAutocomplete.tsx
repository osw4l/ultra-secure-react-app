import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Avatar } from "@heroui/avatar";
import { Key } from "@react-types/shared";
import { Chip } from "@heroui/react";

import { useCategoriesStore, useCredentialFormStore } from "@/stores";

export default function CategoryAutocomplete() {
  const { categories } = useCategoriesStore();
  const { credentialFormData, setCredentialFormData } =
    useCredentialFormStore();

  const onSelectionChange = (key: Key | null) => {
    if (!key) return;

    const idString = key.toString();
    const selectedCategory = categories.find(
      (category) => category.uuid === idString,
    );

    if (!selectedCategory) return;
    setCredentialFormData({
      ...credentialFormData,
      category: {
        ...selectedCategory,
        selectedCategoryKey: selectedCategory.uuid,
        custom: selectedCategory.custom,
      },
    });
  };

  return (
    <Autocomplete
      className="w-full"
      isClearable={false}
      label="Select Category"
      selectedKey={credentialFormData.category?.selectedCategoryKey}
      onSelectionChange={onSelectionChange}
    >
      {categories.map((category) => (
        <AutocompleteItem
          key={category.uuid}
          endContent={
            category.custom ? (
              <Chip color="success" size="sm" variant="flat">
                Custom
              </Chip>
            ) : null
          }
          startContent={
            <Avatar
              alt={category.name}
              className="w-10 h-10 object-cover"
              src={category.icon}
            />
          }
        >
          {category.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
