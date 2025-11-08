export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'guana_vive_access_token',
  REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'guana_vive_refresh_token',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Guana Vive',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdQ8AUsAAAAAN42S8iRfk7vnx49deeoDJLvbMKU',
} as const;
