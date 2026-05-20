import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

type HeadingProps = {
  level: Level;
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
  id?: string;
};

const levelClass: Record<Level, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl",
  2: "text-3xl sm:text-4xl lg:text-5xl",
  3: "text-2xl sm:text-3xl",
  4: "text-xl sm:text-2xl",
};

export function Heading({ level, children, eyebrow, className, id }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-(--color-horizon-deep)">
          {eyebrow}
        </span>
      )}
      <Tag id={id} className={cn(levelClass[level], "text-balance")}>
        {children}
      </Tag>
    </div>
  );
}
