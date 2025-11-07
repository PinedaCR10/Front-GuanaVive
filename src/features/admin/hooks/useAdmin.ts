import { useState, useCallback } from 'react';
import { adminApi } from '../api';
import type {
  DashboardStats,
  UsersStats,
  PublicationsStats,
  CategoriesStats,
  SubscriptionsStats,
  RecentActivity,
} from '../types';

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDashboardStats = useCallback(async (): Promise<DashboardStats | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getDashboardStats();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas del dashboard';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUsersStats = useCallback(async (): Promise<UsersStats | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getUsersStats();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas de usuarios';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPublicationsStats = useCallback(async (): Promise<PublicationsStats | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getPublicationsStats();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas de publicaciones';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCategoriesStats = useCallback(async (): Promise<CategoriesStats | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getCategoriesStats();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas de categorías';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSubscriptionsStats = useCallback(async (): Promise<SubscriptionsStats | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getSubscriptionsStats();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas de suscripciones';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecentActivities = useCallback(async (): Promise<RecentActivity[] | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getRecentActivities();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener actividades recientes';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getDashboardStats,
    getUsersStats,
    getPublicationsStats,
    getCategoriesStats,
    getSubscriptionsStats,
    getRecentActivities,
  };
};
