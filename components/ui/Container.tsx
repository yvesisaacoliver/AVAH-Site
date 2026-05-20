import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  size?: "default" | "narrow" | "wide";
};

const sizeClass: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-(--container-max)",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
