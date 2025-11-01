export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    BY_ID: (id: string) => `/users/${id}`,
    BY_EMAIL: (email: string) => `/users/email/${email}`,
    CHANGE_PASSWORD: (id: string) => `/users/${id}/change-password`,
    TOGGLE_STATUS: (id: string) => `/users/${id}/toggle-status`,
    UPDATE_AVATAR: '/users/profile/avatar',
  },
  PUBLICATIONS: {
    BASE: '/publications',
    BY_ID: (id: string) => `/publications/${id}`,
    MY_PUBLICATIONS: '/publications/my-publications',
    BY_CATEGORY: (category: string) => `/publications/filter/category/${category}`,
    BY_STATUS: (status: string) => `/publications/filter/status/${status}`,
    PUBLISHED: '/publications/published',
    BY_AUTHOR: (authorId: string) => `/publications/author/${authorId}`,
    REQUEST_APPROVAL: (id: string) => `/publications/${id}/request-approval`,
    APPROVE: (id: string) => `/publications/${id}/approve`,
    PENDING: '/publications/admin/pending',
    CHANGE_STATUS: (id: string) => `/publications/${id}/status`,
    UPDATE_IMAGE: (id: string) => `/publications/${id}/image`,
    DELETE_IMAGE: (id: string) => `/publications/${id}/image`,
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
  },
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    BY_ID: (id: string) => `/subscriptions/${id}`,
    UPDATE_ACCESS: (id: string) => `/subscriptions/${id}/last-access`,
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'guana_vive_access_token',
  REFRESH_TOKEN: 'guana_vive_refresh_token',
  USER_DATA: 'guana_vive_user_data',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PUBLICATION_CATEGORIES = {
  DANZA: 'danza',
  GASTRONOMIA: 'gastronomia',
  RETAHILERO: 'retahilero',
  ARTISTA_LOCAL: 'artista_local',
  GRUPO_MUSICA: 'grupo_musica',
} as const;

export const PUBLICATION_STATUS = {
  DRAFT: 'borrador',
  PUBLISHED: 'publicado',
  ARCHIVED: 'archivado',
  PENDING_REVIEW: 'pendiente_revision',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
