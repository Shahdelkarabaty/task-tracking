import { ref } from "vue";
import { defineStore } from "pinia";
import {
  type Todo,
  type TodoEditRequest,
  type TodoAddRequest,
  Status,
} from "@/models/task-model";
import httpClient from "@/interceptors/auth-client";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Todo[]>([]);
  const taskByID = ref<Todo | null>(null);
  const status = Status;

  const getTasks = async () => {
    try {
      const response = await httpClient.get("/api/todos");
      console.log("response:", response.data.todos);
      tasks.value = response.data.todos;
      console.log("tasks:", tasks.value);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getTaskById = async (taskId: string) => {
    try {
      const response = await httpClient.get(`/api/todos/${taskId}`);
      taskByID.value = response.data.todo;
    } catch (error) {
      console.error("Failed to fetch task details:", error);
    }
  };

  const addTask = async (task: TodoAddRequest) => {
    try {
      const response = await httpClient.post("/api/todos", task);
      tasks.value.push(response.data);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const updateTask = async (taskId: string, updatedTask: TodoEditRequest) => {
    try {
      const response = await httpClient.put(
        `/api/todos/${taskId}`,
        updatedTask
      );
      const index = tasks.value.findIndex((task) => task._id === taskId);
      if (index !== -1) {
        tasks.value[index] = response.data;
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const startTask = async (taskId: string) => {
    try {
      const response = await httpClient.post(`/api/todos/${taskId}/start`);
      const index = tasks.value.findIndex((task) => task._id === taskId);
      if (index !== -1) {
        tasks.value[index].status = status.inProgress;
      }
    } catch (error) {
      console.error("failed to start the task", error);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const response = await httpClient.post(`/api/todos/${taskId}/complete`);
      const index = tasks.value.findIndex((task) => task._id === taskId);
      if (index !== -1) {
        tasks.value[index].status = status.completed;
      }
    } catch (error) {
      console.error("failed to complete the task", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    console.log("deleting_id:", taskId);
    try {
      await httpClient.delete(`/api/todos/${taskId}`);
      tasks.value = tasks.value.filter((task) => task._id !== taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return {
    taskByID,
    tasks,
    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    startTask,
    completeTask,
  };
});
