import { jwtDecode } from "jwt-decode";
import type { Token, User, userAuth } from "@/models/auth.model";
import { defineAbility } from "@casl/ability";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { RouteMeta } from "vue-router";
import router from "@/router";
import { ROLES, type Permissions } from "@/lib/roles-permissions";
import httpClient from "@/interceptors/authClient";

export const useAuthStore = defineStore(
  "auth-store",
  () => {
    const user = ref<User | null>(null);
    const isAuth = computed(() => !!user.value);
    const ability = ref(defineAbility(() => {}));

    const setUserState = (newUser: User | null) => {
      user.value = newUser;
      updatePermissions();
    };

    const resetUserState = () => {
      user.value = null;
      ability.value.update([]);
    };

    const updatePermissions = () => {
      const userRole = user.value?.role;
      if (userRole) {
        ability.value.update(
          ROLES[userRole].map(({ action, resource }) => ({
            action,
            subject: resource,
          }))
        );
      } else {
        ability.value.update([]);
      }
    };

    const login = async (formInput: userAuth) => {
      try {
        console.log("loging in with: ", formInput);
        const response = await httpClient.post("/api/auth/login", formInput);
        const decodedToken = jwtDecode<Token>(response.data.accessToken);
        setUserState({
          email: formInput.email,
          token: response.data.accessToken,
          role: decodedToken.role,
        });
        router.replace("/");
      } catch (error) {
        throw error;
      }
    };

    const register = async (formInput: userAuth): Promise<void> => {
      try {
        const response = await httpClient.post("/api/auth/register", formInput);
        const decodedToken = jwtDecode<Token>(response.data.accessToken);
        const loggedInUser: User = {
          email: formInput.email,
          token: response.data.accessToken,
          role: decodedToken.role,
        };
        setUserState(loggedInUser);
        router.replace("/");
      } catch (error) {
        throw error;
      }
    };

    const logout = () => {
      resetUserState();
      router.replace("/login");
    };

    const checkRouteAuth = (routeMeta: RouteMeta) => {
      return (
        !routeMeta.permission ||
        ability.value.can(
          (routeMeta.permission as Permissions).action,
          (routeMeta.permission as Permissions).resource
        )
      );
    };

    return {
      user,
      isAuth,
      setUserState,
      resetUserState,
      updatePermissions,
      login,
      logout,
      checkRouteAuth,
      register,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["user"],
    },
  }
);
