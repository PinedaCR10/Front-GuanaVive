import { useState } from "react";
import { authService } from "../services/authServices";
import type { LoginDTO, RegisterDTO, User } from "../types/loginType";


export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [error, setError] = useState<string | null>(null);

  async function login(dto: LoginDTO) {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.login(dto);
      setUser(res.user);
      return res;
    } catch (e: any) {
      setError(e?.message || "Error al iniciar sesión");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function register(dto: RegisterDTO) {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.register(dto);
      setUser(res.user);
      return res;
    } catch (e: any) {
      setError(e?.message || "Error al registrar");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return { user, loading, error, login, register, logout };
}
