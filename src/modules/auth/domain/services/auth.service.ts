import type { IAuthUser } from "../interfaces/auth-user.interface";

export interface AuthServiceAdapter {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<IAuthUser | null>;
  refreshSession(): Promise<IAuthUser | null>;
  getToken(): Promise<string>;
}
