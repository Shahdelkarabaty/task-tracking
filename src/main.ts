import "./assets/main.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Button, Column, DataTable, DataView } from "primevue";
import Aura from "@primevue/themes/aura";
import TaskDetail from "./views/task-detail.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("taskDetail", TaskDetail);
app.component("DataTable", DataTable);
app.component("TaskColumn", Column);
app.component("ButtonDesign", Button);
app.component("DataView", DataView);

app.use(createPinia());
app.use(router);

app.mount("#app");
