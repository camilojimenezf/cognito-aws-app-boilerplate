import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../modules/auth/presentation/stores/auth.store";
import { useAuth } from "../modules/auth/presentation/composables/useAuth";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () =>
        import("../modules/home/presentation/pages/HomePage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/auth",
      component: () =>
        import("../modules/auth/presentation/pages/AuthPage.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { checkAuth } = useAuth();

  await checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});
