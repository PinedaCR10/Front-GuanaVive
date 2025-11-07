import { usersApi } from "../../features/users";
import type { User, CreateUserDto } from "../../features/users/types";
import type { PaginationParams, ApiResponse } from "../../core/types";

export const userService = {
  /**
   * Obtiene todos los usuarios con paginación y filtros
   */
  async getUsers(params?: PaginationParams): Promise<ApiResponse<User[]>> {
    try {
      return await usersApi.getAll(params);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Obtiene un usuario por ID
   */
  async getUser(userId: string): Promise<ApiResponse<User>> {
    try {
      return await usersApi.getById(userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  /**
   * Crea un nuevo usuario (solo admin)
   */
  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      return await usersApi.create(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Actualiza un usuario existente
   */
  async updateUser(userId: string, _updateData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      // El endpoint de update del backend acepta un PATCH con los campos a actualizar
      return await usersApi.getById(userId);
      // TODO: Crear método update en usersApi si es necesario
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  /**
   * Elimina un usuario
   */
  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    try {
      return await usersApi.delete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  /**
   * Activa o desactiva un usuario
   */
  async toggleUserStatus(userId: string): Promise<ApiResponse<User>> {
    try {
      return await usersApi.toggleStatus(userId);
    } catch (error) {
      console.error("Error toggling user status:", error);
      throw error;
    }
  },

  /**
   * Cambia la contraseña de un usuario
   */
  async changeUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    try {
      return await usersApi.changePassword(userId, { currentPassword, newPassword });
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
