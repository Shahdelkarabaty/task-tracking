<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import DataView from "primevue/dataview";
import SelectButton from "primevue/selectbutton";
import { useTaskStore } from "@/stores/taskStore";
import { Button } from "primevue";

const searchQuery = ref("");
const taskStore = useTaskStore();
const layout = ref<"list" | "grid">("grid");
const options = ["list", "grid"];

onMounted(() => {
  taskStore.getTasks();
});

function getStatusClass(status: string): string {
  switch (status) {
    case "In Progress":
      return "text-blue-500";
    case "Completed":
      return "text-green-500";
    case "To Do":
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
  return taskStore.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const vOverdue = {
  mounted: (el: any, binding: any) => {
    const deadline = new Date(binding.value);
    const now = new Date();

    if (deadline < now) {
      el.classList.add("is-overdue");
    }
  },
};
</script>

<template>
  <div class="p-6">
    <header class="mb-4">
      <nav class="text-center">
        <RouterLink to="/" class="text-sm text-blue-500 hover:underline mx-2"
          >Home</RouterLink
        >
        <RouterLink
          to="/addTask"
          class="text-sm text-blue-500 hover:underline mx-2"
          >Add Task</RouterLink
        >
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
    <DataView :value="filteredTasks" :layout="layout" dataKey="id">
      <template #list="slotProps">
        <ul class="list-none p-0">
          <li
            v-for="item in slotProps.items"
            :key="item.id"
            v-overdue="item.deadline"
            class="p-4 border-b border-gray-200 flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">Deadline: {{ item.deadline }}</p>
              <p :class="getStatusClass(item.status)" class="text-sm">
                Status: {{ item.status }}
              </p>
            </div>
            <div>
              <RouterLink :to="`/tasks/edit/${item.id}`">
                <Button class="!bg-sky-700 hover:!bg-sky-60 mr-2">Edit</Button>
              </RouterLink>
              <Button
                severity="danger"
                class="btn-danger"
                outlined
                @click="deleteTask(item.id)"
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
            :key="item.id"
            v-overdue="item.deadline"
            class="p-4 bg-white shadow-md rounded-md"
          >
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">Deadline: {{ item.deadline }}</p>
            <p :class="getStatusClass(item.status)" class="text-sm">
              Status: {{ item.status }}
            </p>
            <div class="flex justify-end mt-4">
              <RouterLink :to="`/tasks/edit/${item.id}`">
                <button class="btn-secondary mr-2">Edit</button>
              </RouterLink>
              <button class="btn-danger" @click="deleteTask(item.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
