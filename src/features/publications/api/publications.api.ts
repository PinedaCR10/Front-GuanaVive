import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import { normalizePublicationStatus } from '../../../core/utils';
import type { ApiResponse } from '../../../core/types';
import type {
  Publication,
  CreatePublicationDto,
  UpdatePublicationDto,
  PublicationQueryParams,
  ApprovePublicationDto,
  UpdateImageDto,
} from '../types';

/**
 * Normaliza el status de una publicación
 */
const normalizePublication = (publication: Publication): Publication => {
  return {
    ...publication,
    status: normalizePublicationStatus(publication.status),
  };
};

/**
 * Normaliza el status de un array de publicaciones
 */
const normalizePublications = (publications: Publication[]): Publication[] => {
  return publications.map(normalizePublication);
};

export const publicationsApi = {
  async getAll(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BASE}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getById(id: string): Promise<ApiResponse<Publication>> {
    const response = await apiClient.get<Publication>(API_ROUTES.PUBLICATIONS.BY_ID(id));
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async getMyPublications(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.MY_PUBLICATIONS}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getByCategory(category: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_CATEGORY(category)}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getByStatus(status: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_STATUS(status)}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getPublished(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.PUBLISHED}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getByAuthor(authorId: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_AUTHOR(authorId)}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async getPending(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.PENDING}${queryString}`);
    if (response.data) {
      response.data = normalizePublications(response.data);
    }
    return response;
  },

  async create(dto: CreatePublicationDto): Promise<ApiResponse<Publication>> {
    const response = await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.BASE, dto);
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async update(id: string, dto: UpdatePublicationDto): Promise<ApiResponse<Publication>> {
    const response = await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.BY_ID(id), dto);
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async changeStatus(id: string, status: string): Promise<ApiResponse<Publication>> {
    const response = await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.CHANGE_STATUS(id), { status });
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async requestApproval(id: string): Promise<ApiResponse<Publication>> {
    const response = await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.REQUEST_APPROVAL(id));
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async approve(id: string, dto: ApprovePublicationDto): Promise<ApiResponse<Publication>> {
    const response = await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.APPROVE(id), dto);
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async updateImage(id: string, dto: UpdateImageDto): Promise<ApiResponse<Publication>> {
    const response = await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.UPDATE_IMAGE(id), dto);
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async deleteImage(id: string): Promise<ApiResponse<Publication>> {
    const response = await apiClient.delete<Publication>(API_ROUTES.PUBLICATIONS.DELETE_IMAGE(id));
    if (response.data) {
      response.data = normalizePublication(response.data);
    }
    return response;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(API_ROUTES.PUBLICATIONS.BY_ID(id));
  },
};
