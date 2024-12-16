import "./assets/main.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Column, DataTable, DataView, ToastService } from "primevue";
import Aura from "@primevue/themes/aura";
import TaskDetail from "./views/task-detail.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useAuthStore } from "./stores/authStore";
import { Can } from "@casl/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("taskDetail", TaskDetail);
app.component("DataTable", DataTable);
app.component("TaskColumn", Column);
app.component("DataView", DataView);

app.use(ToastService);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const authStore = useAuthStore();
authStore.updatePermissions();

app.component(Can.name!, Can);
app.use(VueQueryPlugin);


app.use(router);

app.mount("#app");
