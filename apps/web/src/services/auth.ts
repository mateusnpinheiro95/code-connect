import api from './api'

export interface AuthResponse {
  access_token: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return api
    .post<AuthResponse>('/auth/login', { email, password })
    .then((r) => r.data)
}

export function register(
  name: string,
  email: string,
  password: string,
): Promise<UserResponse> {
  return api
    .post<UserResponse>('/users', { name, email, password })
    .then((r) => r.data)
}

export function getMe(token: string): Promise<UserResponse> {
  return api
    .get<UserResponse>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data)
}
