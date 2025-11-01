export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export type UserRole = 'admin' | 'user';

export type PublicationCategory = 'danza' | 'gastronomia' | 'retahilero' | 'artista_local' | 'grupo_musica';

export type PublicationStatus = 'borrador' | 'publicado' | 'archivado' | 'pendiente_revision';

export type SortOrder = 'ASC' | 'DESC';
