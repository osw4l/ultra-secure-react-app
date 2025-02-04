import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardProps } from "@heroui/card";
import { cn } from "@nextui-org/theme";
import { PressEvent } from "@react-types/shared/src/events";

export type ActionCardProps = CardProps & {
  icon: string;
  title: string;
  color?: "primary" | "secondary" | "warning" | "danger" | "success";
  description: string;
  handleClick: (e: PressEvent) => void;
};

const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  (
    {
      color,
      title,
      icon,
      description,
      children,
      className,
      handleClick,
      ...props
    },
    ref,
  ) => {
    const colors = React.useMemo(() => {
      switch (color) {
        case "primary":
          return {
            card: "border-default-100",
            iconWrapper: "bg-primary-50 border-primary-100",
            icon: "text-primary",
          };
        case "secondary":
          return {
            card: "border-secondary-200",
            iconWrapper: "bg-secondary-100 border-secondary-200",
            icon: "text-secondary",
          };
        case "warning":
          return {
            card: "border-teal-300",
            iconWrapper: "bg-teal-100 border-teal-200",
            icon: "text-teal-300",
          };
        case "danger":
          return {
            card: "border-danger-300",
            iconWrapper: "bg-danger-50 border-danger-100",
            icon: "text-danger",
          };
        case "success":
          return {
            card: "border-lime-500",
            iconWrapper: "bg-lime-50' border-lime-500",
            icon: "text-lime-500",
          };

        default:
          return {
            card: "border-default-200",
            iconWrapper: "bg-default-50 border-default-100",
            icon: "text-default-500",
          };
      }
    }, [color]);

    return (
      <Card
        ref={ref}
        isPressable
        className={cn("border-small", colors?.card, className)}
        shadow="none"
        onPress={handleClick}
        {...props}
      >
        <CardBody className="flex h-full flex-row items-start gap-3 p-4">
          <div
            className={cn(
              "item-center flex rounded-medium border p-2",
              colors?.iconWrapper,
            )}
          >
            <Icon className={colors?.icon} icon={icon} width={24} />
          </div>
          <div className="flex flex-col">
            <p className={"text-medium " + colors?.icon}>
              <strong>{title}</strong>
            </p>
            <p className="text-small text-default-400">
              {description || children}
            </p>
          </div>
        </CardBody>
      </Card>
    );
  },
);

ActionCard.displayName = "ActionCard";

export default ActionCard;
