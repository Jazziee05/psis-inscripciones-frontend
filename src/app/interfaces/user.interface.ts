export interface User {
  id?: number;
  username: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  groups?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registrationCode: string;
  // Agrega más campos según sea necesario
}

export interface AuthUserPayload {
  id: number;
  username: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  groups?: string[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUserPayload;
}
