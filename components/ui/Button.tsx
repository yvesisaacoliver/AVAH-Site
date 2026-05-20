import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-pill) font-medium transition-colors duration-150 select-none";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-(--color-amber) text-(--color-ink) hover:bg-(--color-amber-deep) hover:text-(--color-cream)",
  secondary:
    "bg-(--color-ink) text-(--color-cream) hover:bg-(--color-ink-soft)",
  ghost:
    "bg-transparent text-(--color-ink) hover:bg-(--color-cream-deep)",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & {
    href?: never;
    external?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variantClass[variant], sizeClass[size], className);
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const finalClass = classes(variant, size, props.className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={finalClass}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={finalClass}>
        {props.children}
      </Link>
    );
  }

  const { children, variant: _v, size: _s, className: _c, ...rest } = props;
  return (
    <button className={finalClass} {...rest}>
      {children}
    </button>
  );
}
