import type { DirectiveBinding } from "vue";

export enum Status {
  todo = "To Do",
  inProgress = "In Progress",
  completed = "Completed",
}

export type Todo = {
  _id: string;
  title: string;
  status: Status;
  deadline: string;
};

export type TodoRequest = Omit<Todo, "_id">;
