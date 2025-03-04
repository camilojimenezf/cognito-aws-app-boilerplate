import { ApiClientFactory } from "../../../../api/api.client";

import type { AuthDatasource } from "../../domain/datasources/auth.datasource";
import type { IUser } from "../../domain/interfaces/user.interface";

const apiClient = ApiClientFactory.createAuthClient();

export class AuthApiDatasource implements AuthDatasource {
  async ensureUser(): Promise<IUser> {
    const response = await apiClient.post("/api/auth/ensure-user");
    return response.data;
  }
}
