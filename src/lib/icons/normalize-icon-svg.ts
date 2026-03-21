const SVG_OPEN_TAG_REGEX = /<svg\b[^>]*>/i;
const SVG_CLOSE_TAG_REGEX = /<\/svg>/i;

export function normalizeIconSvg(svg: string): string {
    if (!svg) return "";

    let result = svg.trim();

    result = result
        .replace(/<\?xml[\s\S]*?\?>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\swidth="[^"]*"/gi, "")
        .replace(/\sheight="[^"]*"/gi, "")
        .replace(/\sclass="[^"]*"/gi, "")
        .replace(/\sstyle="[^"]*"/gi, "");

    result = result.replace(
        /\s(fill|stroke)="(?!none|currentColor)[^"]*"/gi,
        (_match, attr) => ` ${attr}="currentColor"`,
    );

    result = result.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
        const safeAttrs = attrs
            .replace(/\saria-hidden="[^"]*"/gi, "")
            .replace(/\sfocusable="[^"]*"/gi, "")
            .replace(/\sxmlns="[^"]*"/gi, "")
            .trim();

        const normalizedAttrs = [
            safeAttrs,
            'xmlns="http://www.w3.org/2000/svg"',
            'aria-hidden="true"',
            'focusable="false"',
        ]
            .filter(Boolean)
            .join(" ");

        return `<svg ${normalizedAttrs}>`;
    });

    return result.trim();
}

export function isProbablyValidSvg(svg?: string | null): boolean {
    if (!svg) return false;

    const normalized = normalizeIconSvg(svg);

    if (!normalized) return false;
    if (!SVG_OPEN_TAG_REGEX.test(normalized)) return false;
    if (!SVG_CLOSE_TAG_REGEX.test(normalized)) return false;

    return true;
}