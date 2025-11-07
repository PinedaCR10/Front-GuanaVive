import type { PublicationStatus } from '../types';

/**
 * Normaliza el status de publicación del backend al formato esperado del frontend
 * El backend puede enviar valores inconsistentes como "PENDING", "PENDING_REVIEW", etc.
 */
export const normalizePublicationStatus = (status: string): PublicationStatus => {
  const normalizedStatus = status.toLowerCase().trim();

  // Mapeo de diferentes variaciones del backend
  switch (normalizedStatus) {
    case 'borrador':
    case 'draft':
      return 'borrador';

    case 'publicado':
    case 'published':
    case 'approved':
      return 'publicado';

    case 'archivado':
    case 'archived':
    case 'rejected':
      return 'archivado';

    case 'pendiente_revision':
    case 'pendiente':
    case 'pending':
    case 'pending_review':
    case 'pending_approval':
      return 'pendiente_revision';

    default:
      console.warn(`Unknown publication status: ${status}, defaulting to 'borrador'`);
      return 'borrador';
  }
};

/**
 * Convierte el status del frontend al formato que espera el backend
 */
export const denormalizePublicationStatus = (status: PublicationStatus): string => {
  // Por ahora mantenemos los valores del frontend
  // Si el backend necesita otro formato, actualizar aquí
  return status;
};
