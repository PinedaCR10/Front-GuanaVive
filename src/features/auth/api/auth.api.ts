import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse } from '../../../core/types';
import type {
  LoginDto,
  RegisterDto,
  LoginResponse,
  RegisterResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
  MeResponse,
} from '../types';

export const authApi = {
  async login(dto: LoginDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, dto);
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    return response.data;
  },

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, dto);
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    return response.data;
  },

  async logout(): Promise<ApiResponse> {
    return await apiClient.post(API_ROUTES.AUTH.LOGOUT);
  },

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(API_ROUTES.AUTH.REFRESH, dto);
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    return response.data;
  },

  async me(): Promise<MeResponse> {
    const response = await apiClient.get<MeResponse>(API_ROUTES.AUTH.ME);
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    return response.data;
  },
};
