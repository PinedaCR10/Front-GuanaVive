import type { PublicationCategory, PublicationStatus, UserRole } from '../../../core/types';

export interface Publication {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  status: PublicationStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
  category?: {
    id: string;
    name: string;
    description?: string;
  };
}

export interface CreatePublicationDto {
  title: string;
  content: string;
  categoryId: string;
  status?: PublicationStatus;
  imageUrl?: string;
}

export interface UpdatePublicationDto {
  title?: string;
  content?: string;
  categoryId?: string;
  status?: PublicationStatus;
  imageUrl?: string;
}

export interface PublicationQueryParams {
  page?: number;
  limit?: number;
  category?: PublicationCategory;
  status?: PublicationStatus;
  authorId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  order?: 'ASC' | 'DESC';
}

export interface ApprovePublicationDto {
  status: 'publicado' | 'archivado';
  message?: string;
}

export interface UpdateImageDto {
  imageUrl: string;
}
