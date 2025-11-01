import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LoginDto, RegisterDto, User } from '../types';
import { authApi } from '../api';
import { storageUtils, tokenUtils } from '../../../core/utils';
import { STORAGE_KEYS } from '../../../core/constants';

interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthStoreActions {
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        setUser: (user) => {
          set({ user, isAuthenticated: !!user }, false, 'setUser');
          if (user) {
            storageUtils.setUserData(user);
          }
        },

        setTokens: (accessToken, refreshToken) => {
          set({ accessToken, refreshToken }, false, 'setTokens');
          storageUtils.setAccessToken(accessToken);
          storageUtils.setRefreshToken(refreshToken);
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'setLoading');
        },

        setError: (error) => {
          set({ error }, false, 'setError');
        },

        clearAuth: () => {
          set(
            {
              user: null,
              accessToken: null,
              refreshToken: null,
              isAuthenticated: false,
              error: null,
            },
            false,
            'clearAuth'
          );
          storageUtils.clearAll();
        },

        login: async (dto) => {
          try {
            set({ isLoading: true, error: null }, false, 'login/start');

            const response = await authApi.login(dto);

            const { accessToken, refreshToken, user } = response;

            get().setTokens(accessToken, refreshToken);
            get().setUser(user);

            set({ isLoading: false }, false, 'login/success');
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
            set({ isLoading: false, error: errorMessage }, false, 'login/error');
            throw error;
          }
        },

        register: async (dto) => {
          try {
            set({ isLoading: true, error: null }, false, 'register/start');

            await authApi.register(dto);

            const loginResponse = await authApi.login({
              email: dto.email,
              password: dto.password,
            });

            const { accessToken, refreshToken, user } = loginResponse;

            get().setTokens(accessToken, refreshToken);
            get().setUser(user);

            set({ isLoading: false }, false, 'register/success');
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
            set({ isLoading: false, error: errorMessage }, false, 'register/error');
            throw error;
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true }, false, 'logout/start');
            
            await authApi.logout();
            
            get().clearAuth();
            
            set({ isLoading: false }, false, 'logout/success');
          } catch {
            get().clearAuth();
            set({ isLoading: false }, false, 'logout/error');
          }
        },

        refreshAccessToken: async () => {
          try {
            const currentRefreshToken = get().refreshToken || storageUtils.getRefreshToken();

            if (!currentRefreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await authApi.refreshToken({
              refreshToken: currentRefreshToken,
            });

            get().setTokens(response.accessToken, response.refreshToken);
          } catch (error: unknown) {
            get().clearAuth();
            throw error;
          }
        },

        checkAuth: async () => {
          try {
            const accessToken = storageUtils.getAccessToken();
            const refreshToken = storageUtils.getRefreshToken();

            if (!accessToken || !refreshToken) {
              get().clearAuth();
              return;
            }

            if (tokenUtils.isExpired(accessToken)) {
              await get().refreshAccessToken();
            }

            await authApi.me();
            
            const userData = storageUtils.getUserData<User>();
            
            if (userData) {
              get().setUser(userData);
              set({ 
                accessToken, 
                refreshToken: refreshToken || null 
              }, false, 'checkAuth/success');
            } else {
              get().clearAuth();
            }
          } catch {
            get().clearAuth();
          }
        },
      }),
      {
        name: STORAGE_KEYS.USER_DATA,
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
