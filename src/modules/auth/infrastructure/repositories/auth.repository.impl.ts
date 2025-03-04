import type { IUser } from "../../domain/interfaces/user.interface";
import type { AuthRepository } from "../../domain/repositories/auth.repository";

import { AuthApiDatasource } from "../datasources/auth.api.datasource";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthApiDatasource) {}

  ensureUser(): Promise<IUser> {
    return this.authDatasource.ensureUser();
  }
}
