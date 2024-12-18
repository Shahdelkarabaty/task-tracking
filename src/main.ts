import "./assets/main.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { DataView, ToastService } from "primevue";
import Aura from "@primevue/themes/aura";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useAuthStore } from "./stores/auth-store";
import { abilitiesPlugin, Can } from "@casl/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "primeicons/primeicons.css";
import Chart from "primevue/chart";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("DataView", DataView);

app.use(ToastService);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const authStore = useAuthStore();
authStore.setPermissions();

app.component(Can.name!, Can);
app.use(VueQueryPlugin);
app
  .use(abilitiesPlugin, authStore.ability!, { useGlobalProperties: true })
  .component(Can.name!, Can);

app.use(router);

app.mount("#app");
