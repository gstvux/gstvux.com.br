/**
 * Core Logic for Global CV Publishing
 * Follows the technical specification for versioning, renaming, and metadata extraction.
 */

export type GlobalCvRecord = {
  file: string | null;
  href: string | null;
  format: string | null;
  extension: string | null;
  version: string | null;
  updatedAt: string | null;
  isMajorUpdate: boolean;
  language?: string;
  publicMeta?: string;
};

export const MONTHS_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez"
];

/**
 * Extracts the normalized extension from a filename.
 */
export function extractExtension(filePath: string): string {
  const parts = filePath.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

/**
 * Maps extension to public label (e.g. pdf -> PDF).
 */
export function normalizeFormat(extension: string): string {
  const map: Record<string, string> = {
    pdf: "PDF",
  };
  return map[extension] ?? extension.toUpperCase();
}

/**
 * Parses a "major.minor" version string.
 */
export function parseVersion(version: string | null | undefined): { major: number; minor: number } {
  if (!version) return { major: 1, minor: 0 };

  const [majorRaw, minorRaw] = version.split(".");
  const major = parseInt(majorRaw ?? "1", 10);
  const minor = parseInt(minorRaw ?? "0", 10);

  return {
    major: isFinite(major) ? major : 1,
    minor: isFinite(minor) ? minor : 0,
  };
}

/**
 * Calculates the next version based on the semantic rules.
 */
export function getNextVersion(params: {
  currentVersion: string | null | undefined;
  isMajorUpdate: boolean;
  isFirstPublish: boolean;
}): string {
  if (params.isFirstPublish) {
    return "1.0";
  }

  const { major, minor } = parseVersion(params.currentVersion);

  if (params.isMajorUpdate) {
    return `${major + 1}.0`;
  }

  return `${major}.${minor + 1}`;
}

/**
 * Generates the canonical filename according to the spec.
 */
export function buildCvFilename(params: {
  updatedAt: string;
  version: string;
  extension: string;
}): string {
  const date = new Date(params.updatedAt);
  const month = MONTHS_PT[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const versionSlug = params.version.replace(/\./g, "-");
  const ext = params.extension.toLowerCase();

  return `gustavo-luciano-cv-${month}-${year}-v${versionSlug}.${ext}`;
}

/**
 * Detects if the file has changed compared to the previous record.
 */
export function hasFileChanged(previousFile: string | null, nextFile: string | null): boolean {
  if (!previousFile && nextFile) return true;
  if (previousFile && !nextFile) return false;
  return previousFile !== nextFile;
}

/**
 * Formats data for UI display.
 */
export function formatMonthYearPtBr(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const month = MONTHS_PT[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month}/${year}`;
}
