export type CategoryRow = {
  id: string;
  name: string;
  userCount: number;
  createdAt: string;
};

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  id: string;
  name: string;
}
