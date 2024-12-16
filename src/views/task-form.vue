<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, watch } from "vue";
import { Field, Form, useForm } from "vee-validate";
import { useTaskStore } from "@/stores/taskStore";
import { Status, type Todo, type TodoRequest } from "@/models/task-model";
import { taskSchema } from "@/schemas/task-schema";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const isEditMode = !!route.params.id;
const taskId = route.params.id as string;

const form = reactive<TodoRequest>({
  title: "",
  status: Status.todo,
  deadline: "",
});

const updatedTask = ref<Todo>();
const successMessage = ref("");
const isLoading = ref(false);

const { errors } = useForm({
  validationSchema: taskSchema,
});

const touched = reactive({
  title: false,
  deadline: false,
  status: false,
});

onMounted(async () => {
  if (isEditMode) {
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
  }
});

const onSubmit = async () => {
  isLoading.value = true;
  try {
    if (isEditMode) {
      await taskStore.updateTask(taskId, form as Todo);
      successMessage.value = "Task updated successfully!";
    } else {
      await taskStore.addTask(form);
      successMessage.value = "Task added successfully!";
      Object.assign(form, { title: "", status: Status.todo, deadline: "" });
    }
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
        <header class="mb-4">
          <nav class="text-center">
            <RouterLink
              to="/"
              class="text-sm text-blue-500 hover:underline mx-2"
              >Home</RouterLink
            >
            <RouterLink
              to="/addTask"
              class="text-sm text-blue-500 hover:underline mx-2"
              >Add Task</RouterLink
            >
          </nav>
        </header>
        <h3 class="text-xl text-gray-900 text-left mb-5">
          {{ isEditMode ? "Edit Task" : "Add a New Task" }}
        </h3>

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

            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>{{ isEditMode ? "Update Task" : "Add Task" }}</span>
            </button>
            <p v-if="successMessage" class="text-green-500 text-center mb-4">
              {{ successMessage }}
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
