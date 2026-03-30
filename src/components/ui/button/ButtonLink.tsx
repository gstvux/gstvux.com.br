"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonAppearance,
  type ButtonSize,
} from "./button-styles";

export type ButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children"
> & {
  href: string;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  iconOnly?: boolean;
  external?: boolean;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  {
    href,
    appearance = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    iconOnly = false,
    external = false,
    className,
    children,
    disabled = false,
    target,
    rel,
    onClick,
    download,
    ...props
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  const content = (
    <>
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
    </>
  );

  const classes = getButtonClassName({
    appearance,
    size,
    iconOnly,
    className,
  });

  const sharedProps = {
    className: classes,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : props.tabIndex,
    onClick: handleClick,
  };

  const safeRel =
    target === "_blank"
      ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
      : rel;

  if (external || download || target === "_blank") {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={safeRel}
        download={download}
        {...props}
        {...sharedProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link ref={ref as any} href={href} {...props} {...sharedProps}>
      {content}
    </Link>
  );
});
