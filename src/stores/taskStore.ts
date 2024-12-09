import { ref } from "vue";
import { defineStore } from "pinia";
import type { Todo, TodoRequest } from "@/models/task-model";

export const useTaskStore = defineStore("tasks", () => {
  const apiUrl = "http://localhost:8000/tasks";

  const tasks = ref<Todo[]>([]);
  const taskByID = ref<Todo>();

  const getTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const tasksResponse = await response.json();
      console.log(tasksResponse);
      tasks.value = tasksResponse;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getTaskById = async (taskId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${taskId}`);
      if (response.ok) {
        const taskResponse = await response.json();
        taskByID.value = taskResponse;
      } else {
        console.error("Failed to fetch task details");
      }
    } catch (error) {
      console.error("Error fetching task by ID:", error);
    }
  };

  const addTask = async (task: TodoRequest) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const newTask = await response.json();
        tasks.value.push(newTask);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId: string, updatedTask: Todo) => {
    try {
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        const updated = await response.json();
        const index = tasks.value.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          tasks.value[index] = updated;
        }
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      console.log(apiUrl + "/" + taskId);
      const response = await fetch(`${apiUrl}/${taskId}`, { method: "DELETE" });
      if (response.ok) {
        tasks.value = tasks.value.filter((task) => task.id !== taskId);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
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
  };
});
