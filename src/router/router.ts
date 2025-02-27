import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () =>
        import("../modules/home/presentation/pages/HomePage.vue"),
    },
    {
      path: "/auth",
      component: () =>
        import("../modules/auth/presentation/pages/AuthPage.vue"),
    },
  ],
});
