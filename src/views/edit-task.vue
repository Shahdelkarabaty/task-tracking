<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { type Todo, type TodoEditRequest } from "@/models/task-model";
import { useRoute, useRouter } from "vue-router";
import { Form, Field, useForm } from "vee-validate";
import { taskSchema } from "@/schemas/task-schema";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "primevue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const taskId = route.params.id as string;

const form = reactive<TodoEditRequest>({
  title: "",
  description: "",
  deadline: "",
});

const { errors } = useForm({
  validationSchema: toTypedSchema(taskSchema),
});

const touched = reactive({
  title: false,
  deadline: false,
  description: false,
});

onMounted(async () => {
  await taskStore.getTaskById(taskId);
  watch(
    () => taskStore.taskByID,
    (newValue) => {
      if (newValue) {
        Object.assign(form, newValue);
      }
    },
    { immediate: true }
  );
});

const isLoading = ref(false);
const successMessage = ref("");

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await taskStore.updateTask(taskId, form);
    successMessage.value = "Task updated successfully!";
    setTimeout(() => {
      successMessage.value = "";
      router.push("/");
    }, 1000);
  } catch (error) {
    console.error("Error processing task:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="card flex flex-col justify-center p-6">
    <div class="card-content">
      <div class="content">
        <header class="mb-4">
          <nav class="text-center">
            <RouterLink to="/" class="text-sm hover:underline mx-2"
              >Home</RouterLink
            >
            <RouterLink to="/addTask" class="text-sm hover:underline mx-2"
              >Add Task</RouterLink
            >
          </nav>
        </header>
        <h3 class="text-xl text-gray-900 text-left mb-5">Edit Task</h3>
        <Form @submit="onSubmit" :validate-schema="taskSchema">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <label for="title">Title:</label>
              <Field
                name="title"
                id="title"
                type="text"
                v-model="form.title"
                class="border rounded px-3 py-2"
                @blur="touched.title = true"
              />
              <p v-if="errors.title && touched.title" class="text-red-500">
                {{ errors.title }}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="description">Description:</label>
              <Field
                name="description"
                id="description"
                type="text"
                v-model="form.description"
                class="border rounded px-3 py-2"
                @blur="touched.description = true"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="deadline">Deadline:</label>
              <Field
                name="deadline"
                id="deadline"
                type="date"
                v-model="form.deadline"
                class="border rounded px-3 py-2"
                @blur="touched.deadline = true"
              />
              <p
                v-if="errors.deadline && touched.deadline"
                class="text-red-500"
              >
                {{ errors.deadline }}
              </p>
            </div>
            <Button
              type="submit"
              class="px-4 py-2 rounded"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Update Task</span>
            </Button>
            <p v-if="successMessage" class="text-green-500 text-center mb-4">
              {{ successMessage }}
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
