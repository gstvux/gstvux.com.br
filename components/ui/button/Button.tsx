import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonAppearance,
  type ButtonSize,
  cx,
} from "./button-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  iconOnly?: boolean;
  isLoading?: boolean;
};

export function Button({
  type = "button",
  appearance = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={getButtonClassName({
        appearance,
        size,
        iconOnly,
        className,
      })}
      {...props}
    >
      <span
        className={cx(
          "inline-flex items-center justify-center gap-2",
          isLoading && "opacity-0",
        )}
      >
        {leadingIcon ? (
          <span aria-hidden="true" className="inline-flex size-4 items-center justify-center">
            {leadingIcon}
          </span>
        ) : null}

        {!iconOnly ? <span>{children}</span> : null}

        {trailingIcon ? (
          <span aria-hidden="true" className="inline-flex size-4 items-center justify-center">
            {trailingIcon}
          </span>
        ) : null}
      </span>

      {isLoading ? (
        <span
          aria-hidden="true"
          className="absolute inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
    </button>
  );
}