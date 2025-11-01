import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Publication, PublicationQueryParams } from '../types';
import { publicationsApi } from '../api';
import type { PaginationMeta } from '../../../core/types';

interface PublicationsState {
  publications: Publication[];
  currentPublication: Publication | null;
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
}

interface PublicationsActions {
  fetchAll: (params?: PublicationQueryParams) => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  fetchMyPublications: (params?: PublicationQueryParams) => Promise<void>;
  fetchByCategory: (category: string, params?: PublicationQueryParams) => Promise<void>;
  fetchPublished: (params?: PublicationQueryParams) => Promise<void>;
  fetchPending: (params?: PublicationQueryParams) => Promise<void>;
  setCurrentPublication: (publication: Publication | null) => void;
  clearError: () => void;
}

type PublicationsStore = PublicationsState & PublicationsActions;

export const usePublicationsStore = create<PublicationsStore>()(
  devtools(
    (set) => ({
      publications: [],
      currentPublication: null,
      meta: null,
      isLoading: false,
      error: null,

      setCurrentPublication: (publication) => {
        set({ currentPublication: publication }, false, 'setCurrentPublication');
      },

      clearError: () => {
        set({ error: null }, false, 'clearError');
      },

      fetchAll: async (params) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchAll/start');
          const response = await publicationsApi.getAll(params);
          set(
            {
              publications: response.data || [],
              meta: response.meta || null,
              isLoading: false,
            },
            false,
            'fetchAll/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar publicaciones';
          set({ isLoading: false, error: errorMessage }, false, 'fetchAll/error');
        }
      },

      fetchById: async (id) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchById/start');
          const response = await publicationsApi.getById(id);
          set(
            {
              currentPublication: response.data || null,
              isLoading: false,
            },
            false,
            'fetchById/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar publicación';
          set({ isLoading: false, error: errorMessage }, false, 'fetchById/error');
        }
      },

      fetchMyPublications: async (params) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchMyPublications/start');
          const response = await publicationsApi.getMyPublications(params);
          set(
            {
              publications: response.data || [],
              meta: response.meta || null,
              isLoading: false,
            },
            false,
            'fetchMyPublications/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar mis publicaciones';
          set({ isLoading: false, error: errorMessage }, false, 'fetchMyPublications/error');
        }
      },

      fetchByCategory: async (category, params) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchByCategory/start');
          const response = await publicationsApi.getByCategory(category, params);
          set(
            {
              publications: response.data || [],
              meta: response.meta || null,
              isLoading: false,
            },
            false,
            'fetchByCategory/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar publicaciones por categoría';
          set({ isLoading: false, error: errorMessage }, false, 'fetchByCategory/error');
        }
      },

      fetchPublished: async (params) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchPublished/start');
          const response = await publicationsApi.getPublished(params);
          set(
            {
              publications: response.data || [],
              meta: response.meta || null,
              isLoading: false,
            },
            false,
            'fetchPublished/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar publicaciones publicadas';
          set({ isLoading: false, error: errorMessage }, false, 'fetchPublished/error');
        }
      },

      fetchPending: async (params) => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchPending/start');
          const response = await publicationsApi.getPending(params);
          set(
            {
              publications: response.data || [],
              meta: response.meta || null,
              isLoading: false,
            },
            false,
            'fetchPending/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar publicaciones pendientes';
          set({ isLoading: false, error: errorMessage }, false, 'fetchPending/error');
        }
      },
    }),
    { name: 'PublicationsStore' }
  )
);
