import { apiClient } from '../../../core/api';
import { API_ROUTES } from '../../../core/constants';
import type { ApiResponse } from '../../../core/types';
import type {
  DashboardStats,
  UsersStats,
  PublicationsStats,
  CategoriesStats,
  SubscriptionsStats,
  RecentActivity,
} from '../types';

export const adminApi = {
  /**
   * Obtiene estadísticas generales del dashboard
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return await apiClient.get<DashboardStats>(API_ROUTES.ADMIN.DASHBOARD_STATS);
  },

  /**
   * Obtiene estadísticas de usuarios
   */
  async getUsersStats(): Promise<ApiResponse<UsersStats>> {
    return await apiClient.get<UsersStats>(API_ROUTES.ADMIN.USERS_STATS);
  },

  /**
   * Obtiene estadísticas de publicaciones
   */
  async getPublicationsStats(): Promise<ApiResponse<PublicationsStats>> {
    return await apiClient.get<PublicationsStats>(API_ROUTES.ADMIN.PUBLICATIONS_STATS);
  },

  /**
   * Obtiene estadísticas de categorías
   */
  async getCategoriesStats(): Promise<ApiResponse<CategoriesStats>> {
    return await apiClient.get<CategoriesStats>(API_ROUTES.ADMIN.CATEGORIES_STATS);
  },

  /**
   * Obtiene estadísticas de suscripciones
   */
  async getSubscriptionsStats(): Promise<ApiResponse<SubscriptionsStats>> {
    return await apiClient.get<SubscriptionsStats>(API_ROUTES.ADMIN.SUBSCRIPTIONS_STATS);
  },

  /**
   * Obtiene actividades recientes del sistema
   */
  async getRecentActivities(): Promise<ApiResponse<RecentActivity[]>> {
    return await apiClient.get<RecentActivity[]>(API_ROUTES.ADMIN.RECENT_ACTIVITIES);
  },
};
