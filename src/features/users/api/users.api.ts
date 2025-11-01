import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse, PaginationParams } from '../../../core/types';
import type { User, UpdateProfileDto, ChangePasswordDto, UploadAvatarDto } from '../types';

export const usersApi = {
  async getAll(params?: PaginationParams): Promise<ApiResponse<User[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<User[]>(`${API_ROUTES.USERS.BASE}${queryString}`);
  },

  async getById(id: string): Promise<ApiResponse<User>> {
    return await apiClient.get<User>(API_ROUTES.USERS.BY_ID(id));
  },

  async getProfile(): Promise<ApiResponse<User>> {
    return await apiClient.get<User>(API_ROUTES.USERS.PROFILE);
  },

  async updateProfile(dto: UpdateProfileDto): Promise<ApiResponse<User>> {
    return await apiClient.patch<User>(API_ROUTES.USERS.PROFILE, dto);
  },

  async changePassword(id: string, dto: ChangePasswordDto): Promise<ApiResponse<void>> {
    return await apiClient.patch<void>(API_ROUTES.USERS.CHANGE_PASSWORD(id), dto);
  },

  async updateAvatar(dto: UploadAvatarDto): Promise<ApiResponse<User>> {
    return await apiClient.post<User>(API_ROUTES.USERS.UPDATE_AVATAR, dto);
  },

  async toggleStatus(id: string): Promise<ApiResponse<User>> {
    return await apiClient.patch<User>(API_ROUTES.USERS.TOGGLE_STATUS(id));
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(API_ROUTES.USERS.BY_ID(id));
  },
};
