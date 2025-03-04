import {
  signOut as signOutAmplify,
  fetchAuthSession as fetchAuthSessionAmplify,
} from "aws-amplify/auth";

import type { IAuthUser } from "../../domain/interfaces/auth-user.interface";
import type { AuthService } from "../../domain/services/auth.service";
import {
  GetCurrentUserError,
  RefreshSessionError,
} from "../../domain/errors/auth.errors";

export class AuthAmplifyService implements AuthService {
  signIn(): Promise<void> {
    // If we use federated authentication, here we could call federatedSignIn
    throw new Error("SignIn not implemented here, use Amplify UI Components");
  }

  signOut(): Promise<void> {
    return signOutAmplify();
  }

  async getCurrentUser(): Promise<IAuthUser | null> {
    try {
      const session = await fetchAuthSessionAmplify(); // Amplify handles automatically the refresh token
      const isLoggedIn = !!session.tokens;

      if (!isLoggedIn) {
        return null;
      }

      const email = (session.tokens?.idToken?.payload.email as string) || "";
      const accessToken = session.tokens?.idToken?.toString() || ""; // we use the idToken as accessToken because the nestJS backend uses the idToken to authenticate the user
      const refreshToken = "";

      return {
        accessToken,
        refreshToken,
        email,
      };
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new GetCurrentUserError(message);
    }
  }

  async refreshSession(): Promise<IAuthUser | null> {
    try {
      // note: this method is not used in the app because Amplify handles automatically the refresh token
      const session = await fetchAuthSessionAmplify({ forceRefresh: true });
      const isLoggedIn = !!session.tokens;

      if (!isLoggedIn) {
        return null;
      }

      return this.getCurrentUser();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new RefreshSessionError(message);
    }
  }

  async getToken(): Promise<string> {
    const session = await fetchAuthSessionAmplify();
    return session.tokens?.idToken?.toString() || "";
  }
}
