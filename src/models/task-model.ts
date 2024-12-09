import { toTypedSchema } from "@vee-validate/zod";
import type { TypedSchema } from "vee-validate";
import type { DirectiveBinding } from "vue";
import * as zod from "zod";

export enum Status {
  todo = "To Do",
  inProgress = "In Progress",
  completed = "Completed",
}

export type Todo = {
  id: string;
  title: string;
  status: Status;
  deadline: string;
};

export type TodoRequest = Omit<Todo, "id">;

export const taskSchema: TypedSchema<TodoRequest> = toTypedSchema(
  zod.object({
    title: zod.string().min(1, { message: "Title is required" }),
    deadline: zod
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format. Use YYYY-MM-DD.",
      }),
    status: zod.enum(["todo", "in_progress", "done"], {
      message: "Invalid status",
    }),
  })
);

export const overdueDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const deadline = new Date(binding.value);
    const today = new Date();
    if (today > deadline) {
      el.classList.add("bg-red-200");
    }
  },
};
