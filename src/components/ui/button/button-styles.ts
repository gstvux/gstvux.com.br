export type ButtonAppearance = "primary" | "secondary" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

type GetButtonClassNameOptions = {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  iconOnly?: boolean;
  className?: string;
};

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap " +
  "select-none outline-none transition-[background-color,border-color,color,box-shadow,transform,opacity] " +
  "duration-150 ease-out active:translate-y-px " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-[color:var(--color-ember-300)] " +
  "focus-visible:ring-offset-[color:var(--color-bluepetro-  900)] " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "[font-family:var(--font-family-secondary)] font-bold tracking-[0.01em]";

const appearanceMap: Record<ButtonAppearance, string> = {
  primary:
    "rounded-xl border " +
    "border-cta-border-color " +
    "bg-cta-bg " +
    "text-cta-fg " +
    "shadow-[0_12px_28px_rgba(0,0,0,0.18)] " +
    "hover:border-cta-border-color-hover " +
    "hover:bg-cta-bg-hover " +
    "hover:text-cta-fg-hover",

  secondary:
    "rounded-xl border-2 " +
    "border-cta-ghost-border" +
    "bg-transparent " +
    "text-cta-ghost-fg " +
    "hover:border-cta-ghost-border-hover " +
    "hover:text-cta-ghost-fg-hover",

  link:
    "rounded-md border border-transparent bg-transparent px-0 shadow-none " +
    "text-cta-link-fg " +
    "hover:text-cta-link-fg-hover hover:underline hover:underline-offset-4",
};

const solidSizeMap: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-md",
  lg: "h-12 px-6 text-lg",
  icon: "size-11 p-0",
};

const linkSizeMap: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  icon: "size-11 p-0",
};

export function getButtonClassName({
  appearance = "primary",
  size = "md",
  iconOnly = false,
  className,
}: GetButtonClassNameOptions) {
  const sizeClass =
    appearance === "link" ? linkSizeMap[size] : solidSizeMap[size];

  return cx(
    base,
    appearanceMap[appearance],
    sizeClass,
    iconOnly && appearance !== "link" && "aspect-square px-0",
    className,
  );
}