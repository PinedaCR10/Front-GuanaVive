export interface Subscription {
  id: string;
  userId: string;
  plan: 'Básico' | 'Premium' | 'Plus';
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateSubscriptionDto {
  plan: 'Básico' | 'Premium' | 'Plus';
}

export interface UpdateSubscriptionDto {
  plan?: 'Básico' | 'Premium' | 'Plus';
  status?: 'active' | 'inactive' | 'cancelled';
}

export interface SubscriptionQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  plan?: string;
}

export type PlanType = 'Básico' | 'Premium' | 'Plus';

export interface PlanInfo {
  name: PlanType;
  price: number;
  description: string;
  features: string[];
  maxPublications: number | 'unlimited';
}

export const PLANS: Record<PlanType, PlanInfo> = {
  Básico: {
    name: 'Básico',
    price: 0,
    description: 'Publica un solo evento o perfil.',
    features: ['1 publicación', 'Visibilidad básica'],
    maxPublications: 1,
  },
  Premium: {
    name: 'Premium',
    price: 3000,
    description: 'Publica hasta 5 eventos o perfiles. Mayor visibilidad.',
    features: ['Hasta 5 publicaciones', 'Mayor visibilidad', 'Estadísticas básicas'],
    maxPublications: 5,
  },
  Plus: {
    name: 'Plus',
    price: 6000,
    description: 'Publicaciones ilimitadas, soporte prioritario y estadísticas.',
    features: [
      'Publicaciones ilimitadas',
      'Soporte prioritario',
      'Estadísticas avanzadas',
      'Destacado en búsquedas',
    ],
    maxPublications: 'unlimited',
  },
};
