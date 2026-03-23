import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonAppearance,
  type ButtonSize,
} from "./button-styles";

type ButtonLinkProps = Omit<
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

export function ButtonLink({
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
}: ButtonLinkProps) {
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
    <Link href={href} {...props} {...sharedProps}>
      {content}
    </Link>
  );
}