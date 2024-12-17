import type { DirectiveBinding } from "vue";

export enum Status {
  todo = "PENDING",
  inProgress = "IN_PROGRESS",
  completed = "COMPLETED",
}

export type Todo = {
  _id: string;
  title: string;
  status: Status;
  description: string;
  deadline: string;
};

export type TodoAddRequest = Omit<Todo, "_id">;

export type TodoEditRequest = Omit<Todo, "_id" | "status">;
