import type {
  GetUsersResponse,
  GetUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from "./userType";

export const userService = {
  async getUsers(): Promise<GetUsersResponse> {
    // futuro: GET /admin/users
    return { success: true, data: [] };
  },

  async getUser(): Promise<GetUserResponse> {
    return { success: true, data: {} as any };
  },

  async createUser(): Promise<CreateUserResponse> {
    return {
      success: true,
      message: "Usuario creado",
      data: {} as any,
    };
  },

  async updateUser(): Promise<UpdateUserResponse> {
    return {
      success: true,
      message: "Usuario actualizado",
      data: {} as any,
    };
  },

  async deleteUser(): Promise<DeleteUserResponse> {
    return { success: true, message: "Usuario eliminado" };
  },
};
