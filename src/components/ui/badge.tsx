import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "green" | "amber" | "red" | "blue" | "purple" | "gray";

const variants: Record<BadgeVariant, string> = {
  green: "bg-brand-light text-brand-dark",
  amber: "bg-amber-50 text-amber-800",
  red: "bg-red-50 text-red-800",
  blue: "bg-blue-50 text-blue-800",
  purple: "bg-purple-50 text-purple-800",
  gray: "bg-surface-muted text-text-secondary",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "gray",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
