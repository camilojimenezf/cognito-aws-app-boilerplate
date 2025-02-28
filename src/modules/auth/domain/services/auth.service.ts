import type { IAuthUser } from "../interfaces/auth-user.interface";

export abstract class AuthService {
  abstract signIn(): Promise<void>;
  abstract signOut(): Promise<void>;
  abstract getCurrentUser(): Promise<IAuthUser | null>;
  abstract refreshSession(): Promise<IAuthUser | null>;
}
