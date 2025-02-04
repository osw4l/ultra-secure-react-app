import { Card, CardBody, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

import { Credential, useCredentialsStore } from "@/stores/credentialsStore.ts";

interface CredentialItemProps {
  credential: Credential;
}

export default function CredentialItem({ credential }: CredentialItemProps) {
  const { toggleModalOpen, setCredentialDetail } = useCredentialsStore();

  const onViewDetail = () => {
    setCredentialDetail(credential);
    setTimeout(() => {
      toggleModalOpen();
    }, 50);
  };

  return (
    <Card shadow="sm">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={credential.category_data?.icon}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {credential.category_data?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {credential.username}
            </h5>
          </div>
        </div>
        <Button
          color="primary"
          radius="full"
          size="sm"
          variant={"bordered"}
          onPress={onViewDetail}
        >
          View
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-2 text-small text-default-400">
        <p>{credential.notes}</p>
      </CardBody>
    </Card>
  );
}
