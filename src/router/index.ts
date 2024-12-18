import Home from "@/views/home.vue";
import {
  createRouter,
  createWebHistory,
  type NavigationGuard,
} from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { useTaskStore } from "@/stores/task-store";
import { Status } from "@/models/task-model";
import { userRole } from "@/models/auth.model";

const taskGuard: NavigationGuard = async (to, from, next) => {
  const { id } = to.params;
  const taskStore = useTaskStore();
  const authStore = useAuthStore();

  try {
    await taskStore.getTasks();
    const task = taskStore.taskByID;

    // if (
    //   task?.status === Status.completed &&
    //   authStore.user?.role === userRole.ADMIN
    // ) {
    //   return next({ name: "not-found" });
    // }

    // if (!task) {
    //   return next({ name: "not-found" });
    // }
    next();
  } catch (error) {
    console.error("Error:", error);
    next({ name: "not-found" });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: [taskGuard],
    },
    {
      path: "/add",
      name: "addTask",
      component: () => import("../views/add-task.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/dashboard.vue"),
    },
    {
      path: "/tasks/edit/:id",
      name: "editTask",
      component: () => import("../views/edit-task.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../components/not-found.vue"),
    },
    {
      path: "/auth",
      name: "AuthView",
      component: () => import("../views/auth-view.vue"),
      meta: { requiresGuest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.user && to.meta.requiresGuest) {
    return next({ name: "home" });
  }

  if (to.name === "AuthView" || to.name === "not-found") {
    return next();
  }

  if (!authStore.user) {
    return next({ name: "AuthView" });
  }
  next();
});
export default router;
