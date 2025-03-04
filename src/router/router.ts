import { createRouter, createWebHistory } from "vue-router";

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
  const { checkAuth } = useAuth();

  const isAuthenticated = await checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});
