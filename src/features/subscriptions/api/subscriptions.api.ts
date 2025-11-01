import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse } from '../../../core/types';
import type {
  Subscription,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  SubscriptionQueryParams,
} from '../types';

export const subscriptionsApi = {
  async getAll(params?: SubscriptionQueryParams): Promise<ApiResponse<Subscription[]>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return await apiClient.get<Subscription[]>(`${API_ROUTES.SUBSCRIPTIONS.BASE}${queryString}`);
  },

  async getById(id: string): Promise<ApiResponse<Subscription>> {
    return await apiClient.get<Subscription>(API_ROUTES.SUBSCRIPTIONS.BY_ID(id));
  },

  async getMySubscription(): Promise<ApiResponse<Subscription>> {
    return await apiClient.get<Subscription>(`${API_ROUTES.SUBSCRIPTIONS.BASE}/my-subscription`);
  },

  async create(dto: CreateSubscriptionDto): Promise<ApiResponse<Subscription>> {
    return await apiClient.post<Subscription>(API_ROUTES.SUBSCRIPTIONS.BASE, dto);
  },

  async update(id: string, dto: UpdateSubscriptionDto): Promise<ApiResponse<Subscription>> {
    return await apiClient.patch<Subscription>(API_ROUTES.SUBSCRIPTIONS.BY_ID(id), dto);
  },

  async cancel(id: string): Promise<ApiResponse<Subscription>> {
    return await apiClient.patch<Subscription>(`${API_ROUTES.SUBSCRIPTIONS.BY_ID(id)}/cancel`);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(API_ROUTES.SUBSCRIPTIONS.BY_ID(id));
  },

  async updateLastAccess(id: string): Promise<ApiResponse<Subscription>> {
    return await apiClient.patch<Subscription>(API_ROUTES.SUBSCRIPTIONS.UPDATE_ACCESS(id));
  },
};
