import React, { type ReactNode } from "react";

import {
    isProbablyValidSvg,
    normalizeIconSvg,
} from "@/src/lib/icons/normalize-icon-svg";

type CmsIconProps = {
    svg?: string | null;
    className?: string;
    fallback?: ReactNode;
};

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

export function CmsIcon({ svg, className, fallback = null }: CmsIconProps) {
    if (!svg) return fallback;
    if (!isProbablyValidSvg(svg)) return fallback;

    const markup = normalizeIconSvg(svg);

    if (!markup) return fallback;

    return (
        <span
            aria-hidden="true"
            className={cx(
                "inline-flex shrink-0 items-center justify-center",
                "[&>svg]:block [&>svg]:size-full [&>svg]:overflow-visible",
                className,
            )}
            dangerouslySetInnerHTML={{ __html: markup }}
        />
    );
}