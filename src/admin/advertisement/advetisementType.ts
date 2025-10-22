// src/admin/ads/types.ts
// Reemplazamos enums por union types para evitar el error ts(1294)

export type PublicationSortBy = "createdAt" | "updatedAt" | "title";
export type SortOrder = "ASC" | "DESC";

// Ajusta estos valores a los reales de tu backend si difieren
export type PublicationCategory =
  | "musica"
  | "arte"
  | "deportes"
  | "tecnologia"
  | "otros";

export type PublicationStatus = "APPROVED" | "REJECTED" | "PENDING";

export interface IFindPublicationsOptions {
  page?: number;
  limit?: number;
  sortBy?: PublicationSortBy;
  order?: SortOrder;
  category?: PublicationCategory;
  status?: PublicationStatus;
  authorId?: string;
  search?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface PublicationQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  category?: string;
  status?: string;
  authorId?: string;
  search?: string;
}

export type PublicationRow = {
  id: string;
  title: string;
  excerpt?: string;
  userName: string;
  category: PublicationCategory;
  status: PublicationStatus;
  createdAt: string;
};
