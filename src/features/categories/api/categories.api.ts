import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse, PaginationParams } from '../../../core/types';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../types';

export const categoriesApi = {
  async getAll(params?: PaginationParams): Promise<ApiResponse<Category[]>> {
    let queryString = '';
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.page !== undefined) queryParams.append('page', String(params.page));
      if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.order) queryParams.append('order', params.order);
      const qs = queryParams.toString();
      if (qs) queryString = `?${qs}`;
    }
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
