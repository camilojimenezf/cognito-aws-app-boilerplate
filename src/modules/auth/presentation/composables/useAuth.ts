import { useAuthStore } from "../stores/auth.store";
import { AuthAmplifyService } from "../../infrastructure/services/auth-amplify.service";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { AuthApiDatasource } from "../../infrastructure/datasources/auth.api.datasource";

const authService = new AuthAmplifyService();
const authRepository = new AuthRepositoryImpl(new AuthApiDatasource());

export const useAuth = () => {
  const authStore = useAuthStore();

  const signIn = async () => {
    await authService.signIn();
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      const authUser = await authService.getCurrentUser();
      const isLoggedIn = !!authUser;

      if (!isLoggedIn) {
        authStore.signOut();
        return false;
      }

      const isFirstLogin = !authStore.isAuthenticated;

      authStore.setAuthUser({
        accessToken: authUser.accessToken,
        refreshToken: authUser.refreshToken,
        email: authUser.email,
      });

      if (isFirstLogin) {
        await ensureUser();
      }

      return true;
    } catch (error) {
      await signOut();
      return false;
    }
  };

  const signOut = async () => {
    await authService.signOut();
    authStore.signOut();
  };

  const ensureUser = async () => {
    await authRepository.ensureUser();
  };

  const refreshToken = async () => {
    return await authService.refreshSession();
  };

  return { signIn, signOut, checkAuth, refreshToken };
};
