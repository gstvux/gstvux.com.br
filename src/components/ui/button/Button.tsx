import Link from "next/link";
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
  href?: string;
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
  href,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const content = (
    <>
      <span
        className={cx(
          "inline-flex items-center justify-center gap-2",
          isLoading && "opacity-0",
        )}
      >
        {leadingIcon ? (
          <span
            aria-hidden="true"
            className="inline-flex size-4 items-center justify-center"
          >
            {leadingIcon}
          </span>
        ) : null}

        {!iconOnly ? <span>{children}</span> : null}

        {trailingIcon ? (
          <span
            aria-hidden="true"
            className="inline-flex size-4 items-center justify-center"
          >
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
    </>
  );

  const commonProps = {
    className: getButtonClassName({
      appearance,
      size,
      iconOnly,
      className,
    }),
  };

  if (href) {
    return (
      <Link href={href} {...commonProps} {...(props as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...commonProps}
      {...props}
    >
      {content}
    </button>
  );
}