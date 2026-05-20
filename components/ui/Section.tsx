import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "none";
  background?: "cream" | "paper" | "ink";
  id?: string;
  ariaLabel?: string;
};

const spacingClass: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-(--section-spacing-y)",
  tight: "py-(--section-spacing-y-tight)",
  none: "",
};

const backgroundClass: Record<NonNullable<SectionProps["background"]>, string> = {
  cream: "bg-(--color-cream)",
  paper: "bg-(--color-paper)",
  ink: "bg-(--color-ink) text-(--color-cream)",
};

export function Section({
  children,
  className,
  spacing = "default",
  background = "cream",
  id,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(spacingClass[spacing], backgroundClass[background], className)}
    >
      {children}
    </section>
  );
}
