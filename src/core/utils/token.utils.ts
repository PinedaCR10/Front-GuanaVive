import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const tokenUtils = {
  decode(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  },

  isExpired(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  },

  isValid(token: string): boolean {
    const decoded = this.decode(token);
    return decoded !== null && !this.isExpired(token);
  },

  getRole(token: string): string | null {
    const decoded = this.decode(token);
    return decoded?.role || null;
  },

  getUserId(token: string): string | null {
    const decoded = this.decode(token);
    return decoded?.sub || null;
  },

  getEmail(token: string): string | null {
    const decoded = this.decode(token);
    return decoded?.email || null;
  },
};
