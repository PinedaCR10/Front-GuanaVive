import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse, PaginationParams } from '../../../core/types';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../types';

export const categoriesApi = {
  async getAll(params?: PaginationParams): Promise<ApiResponse<Category[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Category[]>(`${API_ROUTES.CATEGORIES.BASE}${queryString}`);
  },

  async getById(id: string): Promise<ApiResponse<Category>> {
    return await apiClient.get<Category>(API_ROUTES.CATEGORIES.BY_ID(id));
  },

  async create(dto: CreateCategoryDto): Promise<ApiResponse<Category>> {
    return await apiClient.post<Category>(API_ROUTES.CATEGORIES.BASE, dto);
  },

  async update(id: string, dto: UpdateCategoryDto): Promise<ApiResponse<Category>> {
    return await apiClient.patch<Category>(API_ROUTES.CATEGORIES.BY_ID(id), dto);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(API_ROUTES.CATEGORIES.BY_ID(id));
  },
};
