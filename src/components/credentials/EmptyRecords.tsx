import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Button } from "@heroui/button";

import SecureAnimation from "@/components/animations/SecureAnimation.tsx";
import { useCredentialFormStore } from "@/stores";

const items = [
  {
    key: "setup-company",
    icon: "solar:star-bold-duotone",
    title: "One place for all credentials",
    description: "Organize with categories",
    isCompleted: true,
  },
  {
    key: "add-your-team",
    icon: "solar:lock-password-bold-duotone",
    title: "Save your credentials",
    description: "Easily store and access",
    isCompleted: true,
  },
  {
    key: "add-share-holders",
    icon: "solar:shield-minimalistic-bold-duotone",
    title: "Keep credentials secure",
    description: "Encrypted and protected",
    isCompleted: true,
  },
];

export default function EmptyRecords() {
  const { toggleModalOpen } = useCredentialFormStore();

  return (
    <Card className="py-2">
      <CardBody className="overflow-visible py-2">
        <SecureAnimation />
        <h2 className="font-bold text-4xl text-center">
          Welcome!
        </h2>
        <h2 className="font-semibold text-4xl text-center mb-1">
          Here you can
        </h2>
        <Listbox
          hideSelectedIcon
          aria-label="Onboarding checklist"
          items={items}
          shouldFocusOnHover={false}
          variant="flat"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              classNames={{
                base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                title: "text-medium font-medium",
                description: "text-small text-wrap",
              }}
              description={
                <p className="text-default-500">{item.description}</p>
              }
              startContent={
                <div className="item-center flex rounded-medium border border-divider p-2">
                  <Icon className="text-cyan-400" icon={item.icon} width={24} />
                </div>
              }
              title={item.title}
            />
          )}
        </Listbox>
        <Button
          className="mt-2 bg-gradient-to-tr from-cyan-500 to-cyan-300 text-white shadow-lg"
          endContent={
            <Icon
              className="text-white"
              height={24}
              icon="solar:add-circle-bold"
              width={24}
            />
          }
          size="lg"
          onPress={toggleModalOpen}
        >
          Create your first credential
        </Button>
      </CardBody>
    </Card>
  );
}
