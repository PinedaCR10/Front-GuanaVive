import { adminApi } from "../../features/admin";
import { publicationsApi } from "../../features/publications";

export const adminService = {
  /**
   * Obtiene los datos del dashboard
   */
  async fetchDashboardData() {
    try {
      const response = await adminApi.getDashboardStats();
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },

  /**
   * Obtiene las actividades recientes
   */
  async fetchRequests() {
    try {
      const response = await adminApi.getRecentActivities();
      return response.data || [];
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      throw error;
    }
  },

  /**
   * Obtiene publicaciones pendientes de aprobación
   */
  async fetchPendingPublications() {
    try {
      const response = await publicationsApi.getPending();
      return response.data || [];
    } catch (error) {
      console.error("Error fetching pending publications:", error);
      throw error;
    }
  },

  /**
   * Aprueba una publicación
   */
  async approvePublication(publicationId: string, message?: string) {
    try {
      const response = await publicationsApi.approve(publicationId, {
        status: "publicado",
        message: message || "Publicación aprobada",
      });
      return response.data;
    } catch (error) {
      console.error("Error approving publication:", error);
      throw error;
    }
  },

  /**
   * Rechaza una publicación
   */
  async rejectPublication(publicationId: string, message?: string) {
    try {
      const response = await publicationsApi.approve(publicationId, {
        status: "archivado",
        message: message || "Publicación rechazada",
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting publication:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de usuarios
   */
  async fetchUsersStats() {
    try {
      const response = await adminApi.getUsersStats();
      return response.data;
    } catch (error) {
      console.error("Error fetching users stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de publicaciones
   */
  async fetchPublicationsStats() {
    try {
      const response = await adminApi.getPublicationsStats();
      return response.data;
    } catch (error) {
      console.error("Error fetching publications stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de categorías
   */
  async fetchCategoriesStats() {
    try {
      const response = await adminApi.getCategoriesStats();
      return response.data;
    } catch (error) {
      console.error("Error fetching categories stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de suscripciones
   */
  async fetchSubscriptionsStats() {
    try {
      const response = await adminApi.getSubscriptionsStats();
      return response.data;
    } catch (error) {
      console.error("Error fetching subscriptions stats:", error);
      throw error;
    }
  },
};
