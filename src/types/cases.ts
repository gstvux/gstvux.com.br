/**
 * Shared Domain Types for Case Components
 */

export interface GalleryItem {
  image?: string;
  alt?: string;
  kind?: string;
  caption?: string;
  embed?: string;
}

export interface CaseBaseInfo {
  title: string;
  client?: string;
  partner?: string;
  year?: string;
  stack?: string;
  thumbnail?: string;
}

export interface CaseNarrativeData {
  problem?: any | null;
  challenge?: any | null;
  solution?: any | null;
  constraints?: string[];
  interventions?: string[];
  outcomes?: string[];
}
