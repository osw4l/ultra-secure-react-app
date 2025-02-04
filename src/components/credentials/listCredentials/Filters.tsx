import {
  Select,
  SelectItem,
  Avatar,
  Button,
  Chip,
  Spacer,
} from "@heroui/react";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { SharedSelection } from "@heroui/system";
import React from "react";

import { useCategoriesStore, useFilterStore } from "@/stores";

interface Props {
  fetchCredentials: () => void;
  children: React.ReactNode;
}

export default function FiltersComponent({
  fetchCredentials,
  children,
}: Props) {
  const { categories } = useCategoriesStore();
  const { filter, setFilter, clearFilter } = useFilterStore();

  const onSelectionChange = (keys: SharedSelection | null) => {
    if (!keys) return;
    const idString = keys?.currentKey;
    const selectedCategory = categories.find(
      (category) => category.uuid === idString,
    );

    if (!selectedCategory) return;

    if (selectedCategory?.custom === true) {
      const { category, ...updatedFilter } = filter;

      setFilter({
        ...updatedFilter,
        user_category: selectedCategory.id,
        category: null,
      });
    } else if (selectedCategory?.custom === false) {
      const { user_category, ...updatedFilter } = filter;

      setFilter({
        ...updatedFilter,
        category: selectedCategory.id,
        user_category: null,
      });
    }
  };

  const onSearchChange = (value: string) => {
    setFilter({ search: value });
  };

  const showAll = () => {
    clearFilter();
    setTimeout(() => {
      fetchCredentials();
    }, 500);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">
      {/* Sidebar Filters */}
      <Spacer y={6} />
      <aside className="w-[350px]">
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-xl font-semibold text-default-900 lg:text-3xl">
            Filters
          </h2>
        </div>
        <Spacer y={2} />
        <Card className="w-full">
          <CardBody>
            <div className="flex flex-col gap-4">
              <Select
                className="w-full"
                label="Select category"
                onSelectionChange={onSelectionChange}
              >
                {categories.map((category) => (
                  <SelectItem
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
                  </SelectItem>
                ))}
              </Select>

              <Input
                className="w-full"
                label="Enter your query"
                placeholder="Search here..."
                type="text"
                value={filter.search}
                onValueChange={onSearchChange}
              />

              <Button
                className="w-full"
                color="success"
                size="lg"
                variant="bordered"
                onPress={fetchCredentials}
              >
                Apply Filters
              </Button>

              <Button
                className="w-full"
                color="warning"
                size="lg"
                variant="bordered"
                onPress={showAll}
              >
                Show all
              </Button>
            </div>
          </CardBody>
        </Card>
      </aside>

      {/* Credentials List Grid */}
      <main className="w-full">{children}</main>
    </div>
  );
}
