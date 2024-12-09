import Home from "@/views/home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/addTask",
      name: "addTask",
      component: () => import("../views/task-form.vue"),
    },
    {
      path: "/tasks/edit/:id",
      name: "editTask",
      component: () => import("../views/task-form.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: () => import("../components/error404.vue"),
    },
  ],
});

export default router;
