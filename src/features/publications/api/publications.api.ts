import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse } from '../../../core/types';
import type {
  Publication,
  CreatePublicationDto,
  UpdatePublicationDto,
  PublicationQueryParams,
  ApprovePublicationDto,
  UpdateImageDto,
} from '../types';

export const publicationsApi = {
  async getAll(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BASE}${queryString}`);
  },

  async getById(id: string): Promise<ApiResponse<Publication>> {
    return await apiClient.get<Publication>(API_ROUTES.PUBLICATIONS.BY_ID(id));
  },

  async getMyPublications(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.MY_PUBLICATIONS}${queryString}`);
  },

  async getByCategory(category: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_CATEGORY(category)}${queryString}`);
  },

  async getByStatus(status: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_STATUS(status)}${queryString}`);
  },

  async getPublished(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.PUBLISHED}${queryString}`);
  },

  async getByAuthor(authorId: string, params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.BY_AUTHOR(authorId)}${queryString}`);
  },

  async getPending(params?: PublicationQueryParams): Promise<ApiResponse<Publication[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Publication[]>(`${API_ROUTES.PUBLICATIONS.PENDING}${queryString}`);
  },

  async create(dto: CreatePublicationDto): Promise<ApiResponse<Publication>> {
    return await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.BASE, dto);
  },

  async update(id: string, dto: UpdatePublicationDto): Promise<ApiResponse<Publication>> {
    return await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.BY_ID(id), dto);
  },

  async changeStatus(id: string, status: string): Promise<ApiResponse<Publication>> {
    return await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.CHANGE_STATUS(id), { status });
  },

  async requestApproval(id: string): Promise<ApiResponse<Publication>> {
    return await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.REQUEST_APPROVAL(id));
  },

  async approve(id: string, dto: ApprovePublicationDto): Promise<ApiResponse<Publication>> {
    return await apiClient.post<Publication>(API_ROUTES.PUBLICATIONS.APPROVE(id), dto);
  },

  async updateImage(id: string, dto: UpdateImageDto): Promise<ApiResponse<Publication>> {
    return await apiClient.patch<Publication>(API_ROUTES.PUBLICATIONS.UPDATE_IMAGE(id), dto);
  },

  async deleteImage(id: string): Promise<ApiResponse<Publication>> {
    return await apiClient.delete<Publication>(API_ROUTES.PUBLICATIONS.DELETE_IMAGE(id));
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(API_ROUTES.PUBLICATIONS.BY_ID(id));
  },
};
