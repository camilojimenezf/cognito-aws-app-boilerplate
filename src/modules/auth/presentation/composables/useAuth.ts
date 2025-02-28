import { useAuthStore } from "../stores/auth.store";
import { AuthAmplifyService } from "../../infrastructure/services/auth-amplify.service";

const authService = new AuthAmplifyService();

export const useAuth = () => {
  const authStore = useAuthStore();

  const checkAuth = async () => {
    try {
      const authUser = await authService.getCurrentUser();
      const isLoggedIn = !!authUser;

      if (!isLoggedIn) {
        authStore.signOut();
        return;
      }

      authStore.setAuthUser({
        accessToken: authUser.accessToken,
        refreshToken: authUser.refreshToken,
        email: authUser.email,
      });
    } catch (error) {
      await signOut();
    }
  };

  const signOut = async () => {
    await authService.signOut();
    authStore.signOut();
  };

  return { signOut, checkAuth };
};
