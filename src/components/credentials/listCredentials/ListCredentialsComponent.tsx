import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Divider, Spacer } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";

import { Credential } from "@/stores/credentialsStore.ts";
import CredentialItem from "@/components/credentials/listCredentials/CredentialItem.tsx";
import { useCredentialFormStore, useFilterStore } from "@/stores";
import E404 from "@/components/animations/e404.tsx";
import { title } from "@/components/primitives.ts";
import QueryLoader from "@/components/animations/QueryLoader.tsx";

interface ListCredentialsProps {
  credentials: Credential[];
  fetchCredentials: () => void;
  onRequest: boolean;
}

export default function ListCredentialsComponent({
  credentials,
  fetchCredentials,
  onRequest,
}: ListCredentialsProps) {
  const { toggleModalOpen } = useCredentialFormStore();
  const { clearFilter } = useFilterStore();

  const showAll = () => {
    clearFilter();
    fetchCredentials();
  };

  return (
    <>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            Credentials
          </h1>
          <p className="text-small text-default-400 lg:text-medium">
            Manage your credentials
          </p>
        </div>
        <div>
          <Button
            color="primary"
            startContent={
              <Icon
                className="flex-none text-background/60"
                icon="lucide:plus"
                width={16}
              />
            }
            onPress={toggleModalOpen}
          >
            New Credential
          </Button>
        </div>
      </header>

      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />

      {credentials.length > 0 && !onRequest && (
        <div className="w-full grid p-1 auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 overflow-auto pb-10">
          {credentials.map((credential: Credential) => (
            <CredentialItem key={credential.id} credential={credential} />
          ))}
        </div>
      )}

      {onRequest && (
        <div className="w-full flex justify-center items-center text-center">
          <Card shadow={"sm"}>
            <CardBody className="text-center">
              <QueryLoader />
              <h3 className={"text-1xl mb-5 mt-2" + title()}>
                Please wait
              </h3>
            </CardBody>
          </Card>
        </div>
      )}

      {credentials.length === 0 && !onRequest && (
        <div className="w-full flex justify-center items-center text-center">
          <Card>
            <CardBody className="text-center">
              <E404 />
              <h3 className={"text-1xl mb-5 mt-2" + title()}>No records</h3>
              <Button
                className="w-full"
                color="primary"
                size="lg"
                variant="bordered"
                onPress={showAll}
              >
                Show all
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
