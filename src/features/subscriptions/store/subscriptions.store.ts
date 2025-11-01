import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Subscription, CreateSubscriptionDto, UpdateSubscriptionDto } from '../types';
import { subscriptionsApi } from '../api';

interface SubscriptionsState {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
}

interface SubscriptionsActions {
  fetchMySubscription: () => Promise<void>;
  createSubscription: (dto: CreateSubscriptionDto) => Promise<void>;
  updateSubscription: (id: string, dto: UpdateSubscriptionDto) => Promise<void>;
  cancelSubscription: (id: string) => Promise<void>;
  clearError: () => void;
}

type SubscriptionsStore = SubscriptionsState & SubscriptionsActions;

export const useSubscriptionsStore = create<SubscriptionsStore>()(
  devtools(
    (set) => ({
      subscription: null,
      isLoading: false,
      error: null,

      clearError: () => {
        set({ error: null }, false, 'clearError');
      },

      fetchMySubscription: async () => {
        try {
          set({ isLoading: true, error: null }, false, 'fetchMySubscription/start');
          const response = await subscriptionsApi.getMySubscription();
          set(
            {
              subscription: response.data || null,
              isLoading: false,
            },
            false,
            'fetchMySubscription/success'
          );
        } catch (error: unknown) {
          // Si no tiene suscripción, no es un error
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar suscripción';
          set({ isLoading: false, error: errorMessage, subscription: null }, false, 'fetchMySubscription/error');
        }
      },

      createSubscription: async (dto) => {
        try {
          set({ isLoading: true, error: null }, false, 'createSubscription/start');
          const response = await subscriptionsApi.create(dto);
          set(
            {
              subscription: response.data || null,
              isLoading: false,
            },
            false,
            'createSubscription/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al crear suscripción';
          set({ isLoading: false, error: errorMessage }, false, 'createSubscription/error');
          throw error;
        }
      },

      updateSubscription: async (id, dto) => {
        try {
          set({ isLoading: true, error: null }, false, 'updateSubscription/start');
          const response = await subscriptionsApi.update(id, dto);
          set(
            {
              subscription: response.data || null,
              isLoading: false,
            },
            false,
            'updateSubscription/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al actualizar suscripción';
          set({ isLoading: false, error: errorMessage }, false, 'updateSubscription/error');
          throw error;
        }
      },

      cancelSubscription: async (id) => {
        try {
          set({ isLoading: true, error: null }, false, 'cancelSubscription/start');
          const response = await subscriptionsApi.cancel(id);
          set(
            {
              subscription: response.data || null,
              isLoading: false,
            },
            false,
            'cancelSubscription/success'
          );
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cancelar suscripción';
          set({ isLoading: false, error: errorMessage }, false, 'cancelSubscription/error');
          throw error;
        }
      },
    }),
    { name: 'SubscriptionsStore' }
  )
);
