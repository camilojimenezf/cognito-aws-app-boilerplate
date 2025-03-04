import type { IUser } from "../interfaces/user.interface";

export abstract class AuthDatasource {
  abstract ensureUser(): Promise<IUser>;
}
