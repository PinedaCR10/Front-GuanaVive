export type User = {
  id: string;
  createdAt?: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  // Solo para mock. En tu NestJS real no retornes ni guardes en claro.
  password?: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};
