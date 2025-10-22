// src/types/homeType.ts

/**
 * Tipos comunes para paneles administrativos
 */

export type StatCard = {
  title: string;
  value: string | number;
  icon?: string;
};

export type RecentRequest = {
  id: number;
  title: string;
  status: "pending" | "approved" | "denied";
  createdAt?: string;
};

export type DashboardData = {
  users: number;
  posts: number;
  categories: number;
  revenue: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
