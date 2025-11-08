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

            const { access_token, refresh_token, user } = response;

            get().setTokens(access_token, refresh_token);
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

            get().setTokens(response.access_token, response.refresh_token);
          } catch (error: unknown) {
            get().clearAuth();
            throw error;
          }
        },

        checkAuth: async () => {
          try {
            set({ isLoading: true }, false, 'checkAuth/start');

            const accessToken = storageUtils.getAccessToken();
            const refreshToken = storageUtils.getRefreshToken();

            if (!accessToken || !refreshToken) {
              get().clearAuth();
              set({ isLoading: false }, false, 'checkAuth/no-tokens');
              return;
            }

            if (tokenUtils.isExpired(accessToken)) {
              await get().refreshAccessToken();
            }

            // Obtener los datos actualizados del usuario desde el backend
            const response = await authApi.me();
            
            if (response.success && response.user) {
              // Construir el objeto User completo con los datos del backend
              const userData = storageUtils.getUserData<User>();
              const updatedUser: User = {
                id: response.user.id,
                email: response.user.email,
                firstName: response.user.firstName,
                lastName: response.user.lastName,
                role: response.user.role, // ← Esto viene del backend actualizado
                isActive: userData?.isActive ?? true,
                phone: userData?.phone,
                avatar: userData?.avatar,
                bio: userData?.bio,
                dateOfBirth: userData?.dateOfBirth,
                address: userData?.address,
                city: userData?.city,
                country: userData?.country,
                createdAt: userData?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              get().setUser(updatedUser);
              set({ 
                accessToken, 
                refreshToken: refreshToken || null,
                isLoading: false 
              }, false, 'checkAuth/success');
            } else {
              get().clearAuth();
              set({ isLoading: false }, false, 'checkAuth/invalid-response');
            }
          } catch (error) {
            console.error('Error en checkAuth:', error);
            get().clearAuth();
            set({ isLoading: false }, false, 'checkAuth/error');
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
