import { STORAGE_KEYS } from '../constants';

export const storageUtils = {
  setAccessToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setUserData(data: unknown): void {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  },

  getUserData<T>(): T | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  clear(key: string): void {
    localStorage.removeItem(key);
  },
};
