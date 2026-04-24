import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Interface para os dados de um case para rastreio.
 */
export interface TrackCaseViewProps {
  title: string;
  slug: string;
  category?: string;
}

/**
 * Envia um evento 'case_view' para o GTM DataLayer.
 * Inclui uma trava para evitar disparos em ambiente de desenvolvimento.
 */
export const trackCaseView = (caseData: TrackCaseViewProps) => {
  // Evita rastreio em desenvolvimento para não sujar os dados
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics] Case View (dev-only):', caseData);
    return;
  }

  sendGTMEvent({
    event: 'case_view',
    case_data: {
      name: caseData.title,
      slug: caseData.slug,
      category: caseData.category || 'general',
      timestamp: new Date().toISOString(),
    }
  });
};
