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
    // El backend devuelve directamente { access_token, refresh_token, user }
    const response = await apiClient.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, dto);
    return response as unknown as LoginResponse;
  },

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    // El backend devuelve { success, message, user }
    const response = await apiClient.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, dto);
    return response as unknown as RegisterResponse;
  },

  async logout(): Promise<ApiResponse> {
    return await apiClient.post(API_ROUTES.AUTH.LOGOUT);
  },

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse> {
    // El backend devuelve directamente { access_token, refresh_token }
    const response = await apiClient.post<RefreshTokenResponse>(API_ROUTES.AUTH.REFRESH, dto);
    return response as unknown as RefreshTokenResponse;
  },

  async me(): Promise<MeResponse> {
    // El backend devuelve { success, user }
    const response = await apiClient.get<MeResponse>(API_ROUTES.AUTH.ME);
    return response as unknown as MeResponse;
  },
};
