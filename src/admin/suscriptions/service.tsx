import { subscriptionsApi } from "../../features/subscriptions";
import { adminApi } from "../../features/admin";
import type { Subscription } from "../../features/subscriptions/types";
import type { SubscriptionsStats } from "../../features/admin/types";
import type { PaginationParams, ApiResponse } from "../../core/types";

export const subscriptionService = {
  /**
   * Obtiene todas las suscripciones con paginación
   */
  async fetchSubscriptions(params?: PaginationParams): Promise<ApiResponse<Subscription[]>> {
    try {
      return await subscriptionsApi.getAll(params);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de suscripciones
   */
  async fetchSubscriptionsStats(): Promise<ApiResponse<SubscriptionsStats>> {
    try {
      return await adminApi.getSubscriptionsStats();
    } catch (error) {
      console.error("Error fetching subscriptions stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene una suscripción por ID
   */
  async getSubscriptionById(id: string): Promise<ApiResponse<Subscription>> {
    try {
      return await subscriptionsApi.getById(id);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  },

  /**
   * Actualiza una suscripción
   */
  async updateSubscription(id: string, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> {
    try {
      return await subscriptionsApi.update(id, data);
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  },

  /**
   * Cancela una suscripción
   */
  async cancelSubscription(id: string): Promise<ApiResponse<Subscription>> {
    try {
      return await subscriptionsApi.cancel(id);
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  },

  /**
   * Elimina una suscripción
   */
  async deleteSubscription(id: string): Promise<ApiResponse<void>> {
    try {
      return await subscriptionsApi.delete(id);
    } catch (error) {
      console.error("Error deleting subscription:", error);
      throw error;
    }
  },
};
