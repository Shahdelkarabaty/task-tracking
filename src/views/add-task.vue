<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { Status, type TodoAddRequest } from "@/models/task-model";
import { useRouter } from "vue-router";
import { Form, Field, useForm } from "vee-validate";
import { taskSchema } from "@/schemas/task-schema";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "primevue";

const router = useRouter();
const taskStore = useTaskStore();

const form = ref<TodoAddRequest>({
  title: "",
  status: Status.todo,
  description: "",
  deadline: "",
});

const { errors } = useForm({
  validationSchema: toTypedSchema(taskSchema),
});

const touched = ref({
  title: false,
  deadline: false,
  status: false,
  description: false,
});

const isLoading = ref(false);
const successMessage = ref("");

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await taskStore.addTask(form.value);
    successMessage.value = "Task added successfully!";
    form.value = {
      title: "",
      status: Status.todo,
      deadline: "",
      description: "",
    };
    setTimeout(() => {
      successMessage.value = "";
      router.push("/");
    }, 2000);
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

        <h3 class="text-xl text-gray-900 text-left mb-5">Add a New Task</h3>
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
            <div class="flex flex-col gap-2">
              <label for="status">Select an Option:</label>
              <Field name="status"
                ><select
                  id="dropdown"
                  v-model="form.status"
                  class="border rounded px-3 py-2"
                  @blur="touched.status = true"
                >
                  <option value="" disabled>Select an option</option>
                  <option
                    v-for="option in Object.values(Status)"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </Field>
              <p v-if="errors.status && touched.status" class="text-red-500">
                {{ errors.status }}
              </p>
            </div>
            <Button
              type="submit"
              class="px-4 py-2 rounded"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Add Task</span>
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
