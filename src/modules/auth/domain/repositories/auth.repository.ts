import type { IUser } from "../interfaces/user.interface";

export abstract class AuthRepository {
  abstract ensureUser(): Promise<IUser>;
}
