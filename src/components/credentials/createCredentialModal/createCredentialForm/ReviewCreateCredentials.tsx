import React, { forwardRef } from "react";
import { cn } from "@nextui-org/theme";
import { Avatar } from "@heroui/avatar";
import { Chip, Divider } from "@heroui/react";

import { useCredentialFormStore } from "@/stores";

const CellWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-2 rounded-medium bg-content2 p-4",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));

type UserCellProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  value: string;
  attribute: string;
};

// eslint-disable-next-line react/display-name
const UserCell = forwardRef<HTMLDivElement, UserCellProps>(
  ({ image, value, attribute, className, ...props }, ref) => (
    <CellWrapper
      ref={ref}
      className={cn("bg-transparent px-3 py-1", className)}
      {...props}
    >
      <p className="text-foreground-400">
        <strong>{attribute}</strong>
      </p>

      {value ? (
        <div className="flex items-center gap-2">
          {image ? <Avatar size="sm" src={image} /> : null}
          <p className="text-default-500">{value}</p>
        </div>
      ) : (
        <Chip color="danger" variant="flat">
          Required
        </Chip>
      )}
    </CellWrapper>
  ),
);

CellWrapper.displayName = "CellWrapper";

export default function ReviewCreateCredentials() {
  const { credentialFormData } = useCredentialFormStore();

  return (
    <div className="mt-2 flex flex-col gap-2">
      <UserCell
        attribute="Category"
        image={credentialFormData.category?.icon || ""}
        value={credentialFormData.category?.name || ""}
      />
      <Divider />
      <UserCell
        attribute="Username"
        image={""}
        value={credentialFormData.username || ""}
      />
      <Divider />
      <UserCell
        attribute="Password"
        image={""}
        value={credentialFormData.password || ""}
      />
      <Divider />
      <UserCell
        attribute="Website"
        image={""}
        value={credentialFormData.website || ""}
      />
      <Divider />
      <UserCell
        attribute="Notes"
        image={""}
        value={credentialFormData.notes || ""}
      />
    </div>
  );
}
