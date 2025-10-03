import type { AuthResponse, LoginDTO, RegisterDTO, User } from "../types/loginType";
import { https } from "./https";


const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "token";
const USERS_RESOURCE = "/users";

// Solo para MOCK
function fakeJwt(user: User): string {
  const payload = { sub: user.id, email: user.email, iat: Date.now() / 1000 };
  return btoa(JSON.stringify(payload));
}

export const authService = {
  async login(dto: LoginDTO): Promise<AuthResponse> {
    const users = await https.get<User[]>(
      `${USERS_RESOURCE}?email=${encodeURIComponent(dto.email)}`
    );
    const user = users[0];

    if (!user || user.password !== dto.password) {
      throw { message: "Credenciales inválidas", status: 401 };
    }

    const token = fakeJwt(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("current_user", JSON.stringify(user));
    return { token, user };
  },

  async register(dto: RegisterDTO): Promise<AuthResponse> {
    const exists = await https.get<User[]>(
      `${USERS_RESOURCE}?email=${encodeURIComponent(dto.email)}`
    );
    if (exists.length) {
      throw { message: "El correo ya está registrado", status: 409 };
    }

    const created = await https.post<User>(USERS_RESOURCE, {
      ...dto,
      createdAt: new Date().toISOString(),
    });

    const token = fakeJwt(created);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("current_user", JSON.stringify(created));
    return { token, user: created };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("current_user");
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem("current_user");
    return raw ? (JSON.parse(raw) as User) : null;
  },
};
