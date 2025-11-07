export interface DashboardStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
  };
  publications: {
    total: number;
    published: number;
    draft: number;
    pending: number;
    archived: number;
  };
  categories: {
    total: number;
  };
  subscriptions: {
    total: number;
    active: number;
    inactive: number;
  };
}

export interface UsersStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  users: number;
  byRole: {
    admin: number;
    user: number;
  };
  recentRegistrations: number;
}

export interface PublicationsStats {
  total: number;
  byStatus: {
    borrador: number;
    publicado: number;
    archivado: number;
    pendiente_revision: number;
  };
  byCategory: {
    [key: string]: number;
  };
  recentPublications: number;
  pendingApproval: number;
}

export interface CategoriesStats {
  total: number;
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    publicationsCount: number;
  }>;
}

export interface SubscriptionsStats {
  total: number;
  active: number;
  inactive: number;
  byPlan: {
    [key: string]: number;
  };
  byStatus: {
    active: number;
    inactive: number;
    expired: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'user' | 'publication' | 'subscription' | 'category';
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject';
  description: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}
