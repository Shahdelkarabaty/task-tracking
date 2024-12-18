<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import DataView from "primevue/dataview";
import SelectButton from "primevue/selectbutton";
import { useTaskStore } from "@/stores/task-store";
import { Button } from "primevue";
import { useAuthStore } from "@/stores/auth-store";
import { userRole } from "@/models/auth.model";
import { useRouter } from "vue-router";
import { vOverdue } from "@/dir/overdue.directive";


const searchQuery = ref("");
const taskStore = useTaskStore();
const authStore = useAuthStore();
const layout = ref<"list" | "grid">("grid");
const options = ["list", "grid"];
const router = useRouter();

onMounted(() => {
  taskStore.getTasks();
});

function getStatusClass(status: string): string {
  switch (status) {
    case "IN_PROGRESS":
      return "text-blue-500";
    case "COMPLETED":
      return "text-green-500";
    case "PENDING":
    default:
      return "text-gray-500";
  }
}

const deleteTask = async (taskId: string) => {
  try {
    await taskStore.deleteTask(taskId);
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

const filteredTasks = computed(() => {
  let tasks = taskStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (authStore.user?.role === userRole.ADMIN) {
    tasks = tasks.filter((task) => task.status !== "COMPLETED");
  }

  return tasks;
});

const logout = () => {
  authStore.logout();
};

const startTask = async (taskId: string) => {
  try {
    await taskStore.startTask(taskId);
  } catch (error) {
    console.error("Failed to start task:", error);
  }
};

const completeTask = async (taskId: string) => {
  try {
    await taskStore.completeTask(taskId);
  } catch (error) {
    console.error("Failed to complete task:", error);
  }
};

const addNewTask = () => {
  router.push("/add");
};
</script>

<template>
  <div class="p-6">
    <header class="mb-6">
      <nav class="flex justify-center">
        <RouterLink
          to="/"
          class="text-sm font-medium text-gray-700 hover:underline mx-2"
        >
          Tasks
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="text-sm font-medium text-gray-700 hover:underline mx-2"
        >
          Dashboard
        </RouterLink>
      </nav>
    </header>
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tasks..."
        class="border border-gray-300 rounded-md px-4 py-2"
      />
      <SelectButton v-model="layout" :options="options" class="w-40" />
    </div>
    <p
      v-if="authStore.user?.role === userRole.ADMIN"
      class="flex items-center bg-yellow-100 border-yellow-500 text-yellow-700 p-4 rounded shadow mb-5"
    >
      Please contact the super admin to delete any task.
    </p>
    <DataView :value="filteredTasks" :layout="layout" dataKey="_id">
      <template #list="slotProps">
        <ul class="list-none p-0">
          <li
            v-for="item in slotProps.items"
            :key="item._id"
            v-overdue="item.deadline"
            class="p-4 border-b border-gray-200 flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">Deadline: {{ item.deadline }}</p>
              <p class="text-sm text-gray-600">
                Description: {{ item.description }}
              </p>
              <p class="text-sm">
                <span>Status: </span
                ><span :class="getStatusClass(item.status)">
                  {{ item.status }}</span
                >
              </p>
              <Button
                icon="pi pi-play-circle"
                :class="[
                  'mr-2 mt-4  p-button-secondary',
                  item.status === 'IN_PROGRESS' ? 'p-button-success' : '',
                ]"
                @click="startTask(item._id)"
              ></Button>
              <Button
                icon="pi pi-check-circle"
                :class="[
                  'p-button-secondary',
                  item.status === 'COMPLETED' ? 'p-button-success' : '',
                ]"
                class="p-button-secondary"
                @click="completeTask(item._id)"
              ></Button>
            </div>
            <div>
              <RouterLink :to="`/tasks/edit/${item._id}`">
                <Button
                  v-if="authStore.ability?.can('update', 'TODOS')"
                  class="mr-2 w-20"
                  >Edit</Button
                >
              </RouterLink>
              <Button
                v-if="authStore.ability?.can('delete', 'TODOS')"
                severity="danger"
                class="btn-danger w-20"
                outlined
                @click="deleteTask(item._id)"
              >
                Delete
              </Button>
            </div>
          </li>
        </ul>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in slotProps.items"
            :key="item._id"
            v-overdue="item.deadline"
            class="p-4 bg-white shadow-md rounded-md"
          >
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">Deadline: {{ item.deadline }}</p>
            <p class="text-sm text-gray-600">
              Description: {{ item.description }}
            </p>
            <p class="text-sm">
              <span>Status: </span
              ><span :class="getStatusClass(item.status)">
                {{ item.status }}</span
              >
            </p>
            <div class="flex justify-between items-center mt-4 space-x-2">
              <div class="flex justify-start">
                <Button
                  icon="pi pi-play-circle"
                  :class="[
                    'mr-2 p-button-secondary',
                    item.status === 'IN_PROGRESS' ? 'p-button-success' : '',
                  ]"
                  @click="startTask(item._id)"
                ></Button>
                <Button
                  icon="pi pi-check-circle"
                  :class="[
                    'p-button-secondary',
                    item.status === 'COMPLETED' ? 'p-button-success' : '',
                  ]"
                  class="p-button-secondary"
                  @click="completeTask(item._id)"
                ></Button>
              </div>
              <div class="flex justify-end">
                <RouterLink :to="`/tasks/edit/${item._id}`">
                  <Button
                    v-if="authStore.ability?.can('update', 'TODOS')"
                    class="mr-2 w-20"
                    >Edit</Button
                  >
                </RouterLink>
                <Button
                  v-if="authStore.ability?.can('delete', 'TODOS')"
                  severity="danger"
                  class="btn-danger w-20"
                  outlined
                  @click="deleteTask(item._id)"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    <Button
      icon="pi pi-plus"
      class="mt-10 p-button-fab p-button-rounded p-button-success absolute bottom-4 left-1/2 transform -translate-x-1/2"
      @click="addNewTask()"
    ></Button>

    <footer
      class="fixed bottom-0 right-0 p-4 bg-white shadow-md flex justify-end w-full"
    >
      <Button
        icon="pi pi-sign-out"
        class="p-button-rounded p-button-outlined p-button-secondary"
        @click="logout"
      ></Button>
    </footer>
  </div>
</template>

<style scoped>
.is-overdue {
  background-color: #ffe6e6;
  border-radius: 0.25rem;
}
</style>
