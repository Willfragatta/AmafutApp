export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'atleta' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'atleta' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 