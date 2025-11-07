import { categoriesApi } from "../../features/categories";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "../../features/categories/types";
import type { PaginationParams, ApiResponse } from "../../core/types";
import type {
  IPaginatedResponse,
  CategoryRow,
  CategoryQueryParams,
} from "./CategoryType";

/**
 * Convierte una Category del backend a CategoryRow para la tabla
 */
const categoryToCategoryRow = (category: Category): CategoryRow => {
  return {
    id: category.id,
    name: category.name,
    userCount: 0, // El backend no devuelve publicationsCount en Category base
    createdAt: new Date(category.createdAt || Date.now()).toLocaleDateString("es-CR"),
  };
};

export const categoryService = {
  /**
   * Lista todas las categorías con paginación y filtros
   */
  async list(params?: CategoryQueryParams): Promise<IPaginatedResponse<CategoryRow>> {
    try {
      const paginationParams: PaginationParams = {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
      };

      const response = await categoriesApi.getAll(paginationParams);

      if (!response.success || !response.data) {
        return {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }

      const categoryRows = response.data.map(categoryToCategoryRow);

      return {
        data: categoryRows,
        meta: {
          page: response.meta?.page || params?.page || 1,
          limit: response.meta?.limit || params?.limit || 10,
          total: response.meta?.total || categoryRows.length,
          totalPages: response.meta?.totalPages || 1,
          hasNextPage: response.meta?.hasNextPage || false,
          hasPreviousPage: response.meta?.hasPreviousPage || false,
        },
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  },

  /**
   * Obtiene una categoría por ID
   */
  async getById(id: string): Promise<ApiResponse<Category>> {
    try {
      return await categoriesApi.getById(id);
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  },

  /**
   * Crea una nueva categoría
   */
  async create(category: CreateCategoryDto): Promise<ApiResponse<Category>> {
    try {
      return await categoriesApi.create(category);
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  /**
   * Actualiza una categoría existente
   */
  async update(id: string, category: UpdateCategoryDto): Promise<ApiResponse<Category>> {
    try {
      return await categoriesApi.update(id, category);
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  /**
   * Elimina una categoría
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      return await categoriesApi.delete(id);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};
